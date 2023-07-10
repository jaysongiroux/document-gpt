import React from 'react';
import { Autocomplete, Button, TextField, Typography } from '../../lib/frontend/mui';
import { fetchAPI } from '../../lib/frontend/fetchAPI';
import styles from './styles.module.scss';
import { uid } from 'uid';
import SelectAndFetchDocumentContent from '@/components/SelectAndFetchDocumentContent';
import { Add, Send } from '@mui/icons-material';
import useHasToken from '@/hooks/useHasToken';
import Token from '@/components/Token';
import { toast } from 'react-toastify';

type Props = {};

type prefillListProps = {
  field: string | undefined | null;
  uid: string;
  type: string | undefined | null;
};

const types = [
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  },
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'time',
    label: 'Time',
  },
  {
    value: 'boolean',
    label: 'Boolean',
  },
  {
    value: 'array',
    label: 'Array',
  },
  {
    value: 'object',
    label: 'Object',
  },
];

const promptDefault = 'given the following OCR text, create a JSON object that Is constructed as: ';
const additionalPrompt = '  Do not include any additional information that is not asked for';

export default function Prefill({}: Props) {
  const [ocrText, setOcrText] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [prefillList, setPrefillList] = React.useState<prefillListProps[]>([]);
  const [objectPrompt, setObjectPrompt] = React.useState<string | null>(null);
  const [generatedJSON, setGeneratedJSON] = React.useState<object | null>(null);
  const { hasToken, setHasToken, systemHasToken } = useHasToken();
  const [token, setToken] = React.useState<string | null>(null);

  const handleTranslate = async (submittedFile: File) => {
    if (!submittedFile) return;
    // get OCR Raw text from API POST /api/ocr using axios
    const formData = new FormData();
    formData.append('file', submittedFile);
    fetchAPI({
      method: 'POST',
      url: '/api/ocr',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({ data }) => {
        setOcrText(data?.data);
      })
      .catch((error) => {
        toast.error('Error getting OCR text');
      });
  };

  const handleSelect = async (e: any) => {
    setFile(e.target.files[0]);

    if (e.target.files[0]) {
      handleTranslate(e.target.files[0]);
    }
  };

  const addField = () => {
    setPrefillList((prev) => [...prev, { field: '', type: 'string', uid: uid() }]);
  };

  const removeField = (itemID: string) => {
    let prefilledDataCopy = Object.assign({}, prefillList);
    prefilledDataCopy = prefillList.filter((item: any) => item.uid !== itemID);
    setPrefillList(prefilledDataCopy);
    setObjectPrompt(translateObjectToJSON(prefilledDataCopy));
  };

  const handleChange = (field: string, value: string | undefined | null, itemID: string) => {
    let prefilledDataCopy = Object.assign({}, prefillList);
    prefilledDataCopy = prefillList.map((item: any) => {
      if (item.uid === itemID) {
        item[field] = value;
      }
      return item;
    });
    setPrefillList(prefilledDataCopy);
    setObjectPrompt(translateObjectToJSON(prefilledDataCopy));
  };

  const translateObjectToJSON = (prefilledDataCopy: any) => {
    // deep copy array
    const prefillListClone = JSON.parse(JSON.stringify(prefilledDataCopy));
    // remove empty fields
    const filteredPrefillList = prefillListClone.filter((item: any) => item.field !== '');
    // remove uid field
    const filteredPrefillListWithoutUID = filteredPrefillList.map((item: any) => {
      delete item.uid;
      return item;
    });
    // construct JSON object into a string: "{value:type, value: type}"
    const prefillListString =
      '{' +
      filteredPrefillListWithoutUID.reduce((acc: any, item: any) => {
        return `${acc ? acc + ', ' : ''}` + `${item.field}: ${item.type}`;
      }, '') +
      '}.';

    return prefillListString;
  };

  const handleSubmit = () => {
    fetchAPI({
      method: 'POST',
      url: '/api/fetchPrefill',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        context: ocrText,
        prompt: wholePrompt,
        token: token,
      },
    })
      .then(({ data }) => {
        setGeneratedJSON(data?.data);
      })
      .catch((error) => {
        toast('There was an error communicating with OpenAI, Please check your Token', { type: 'error' });
      });
  };

  const isValidJSON = (obj: string | object) => {
    if (typeof obj === 'object') {
      return <span style={{ color: 'green' }}>Yes</span>;
    }
    return <span style={{ color: 'red' }}>No</span>;
  };

  const wholePrompt = promptDefault + objectPrompt + additionalPrompt;

  return (
    <div className={styles.prefillContainer}>
      <Token
        setToken={setToken}
        token={token}
        hasToken={hasToken}
        setHasToken={setHasToken}
        systemHasToken={systemHasToken}
      />

      <Typography variant="h2">Prefill</Typography>

      <Typography variant="body1">
        Upload a photo and ask it to generate a JSON object based on the fields you request
      </Typography>
      <div className={'appHeader'}>
        <Typography variant="h4">1. Upload an image</Typography>
        <SelectAndFetchDocumentContent handleSelect={handleSelect} ocrText={ocrText} file={file} />
      </div>

      {ocrText && (
        <section className={styles.prefilledTextContainer}>
          <Typography variant="h4">2. Prefill Fields</Typography>
          <Typography variant="body1">Add the fields and their corresponding type that you want generated</Typography>
          {prefillList?.length > 0 && (
            <Typography variant="body2">
              <strong>Prompt: </strong>
              {wholePrompt}
            </Typography>
          )}
          {prefillList.map((item, index) => {
            return (
              <div key={index} className={styles.prefillInput}>
                <TextField
                  name="field"
                  label="Field"
                  className={styles.inputField}
                  value={item.field}
                  onChange={(e) => handleChange('field', e.target.value, item.uid)}
                />
                <Autocomplete
                  options={types}
                  // TODO: fix this typing issue
                  value={item.type as any}
                  className={styles.inputField}
                  onChange={(e, value) => handleChange('type', value?.value, item.uid)}
                  renderInput={(params) => <TextField name="type" {...params} label="Type" />}
                />
                <Button onClick={() => removeField(item.uid)}>Remove</Button>
              </div>
            );
          })}
          <Button onClick={addField}>
            Add Field
            <Add />
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={prefillList?.length <= 0}>
            Submit
            <Send sx={{ paddingLeft: 1 }} />
          </Button>
        </section>
      )}

      {generatedJSON && (
        <div className={styles.generatedContainer}>
          <Typography variant="h4">3. Generated JSON</Typography>
          <Typography variant="body1">
            Below is the generated JSON Data given the image, and fields from above
          </Typography>
          <pre className={styles.generatedPreTag}>{JSON.stringify(generatedJSON, null, 2)}</pre>
          <div>Valid JSON Object: {isValidJSON(generatedJSON)}</div>
        </div>
      )}
    </div>
  );
}
