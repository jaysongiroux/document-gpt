import React from 'react';
import { Avatar, Button, CircularProgress, TextField, Typography } from '../../lib/frontend/mui';
import SelectAndFetchDocumentContent from '@/components/SelectAndFetchDocumentContent';
import { fetchAPI } from '@/lib/frontend/fetchAPI';
import styles from './styles.module.scss';
import { uid } from 'uid';
import { Send } from '@mui/icons-material';
import useHasToken from '@/hooks/useHasToken';
import Token from '@/components/Token';
import { toast } from 'react-toastify';

type Props = {};

type chatsProps = {
  answer?: string;
  uid: string;
  question?: string;
  error?: string;
};

export default function Chat({}: Props) {
  const [ocrText, setOcrText] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [chats, setChats] = React.useState<chatsProps[]>([]);
  const [question, setQuestion] = React.useState<string | null>(null);
  const [chatLoading, setChatLoading] = React.useState<boolean>(false);
  const { hasToken, setHasToken, systemHasToken } = useHasToken();
  const [token, setToken] = React.useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = React.useState<boolean>(false);
  const chatRef = React.useRef<any>(null);

  const handleTranslate = async (submittedFile: File) => {
    if (!submittedFile) return;
    // get OCR Raw text from API POST /api/ocr using axios
    const formData = new FormData();
    formData.append('file', submittedFile);
    setOcrLoading(true);
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
      .catch(() => {
        toast.error('There was an error translating your document');
      })
      .finally(() => {
        setOcrLoading(false);
      });
  };

  const handleSelect = (e: any) => {
    setFile(e.target.files[0]);

    if (e.target.files[0]) {
      handleTranslate(e.target.files[0]);
      setChats([]);
    }
  };

  const handleSubmit = async (e: any) => {
    if (e) {
      e.preventDefault();
    }
    setChats((prev: any) => [...prev, { question, uid: uid() }]);
    setChatLoading(true);
    // submit for question
    fetchAPI({
      method: 'POST',
      url: '/api/chat',
      body: {
        question,
        context: ocrText,
        token: token,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => {
        // add answer to chats
        if (data?.data) {
          setChats((prev) => [...prev, { answer: data?.data, uid: uid() }]);
        }
        setQuestion('');
        setChatLoading(false);
      })
      .catch((err) => {
        setChatLoading(false);
        setChats((prev) => [...prev, { error: 'There was an error fetching an answer for your question', uid: uid() }]);
      })
      .finally(() => {
        scrollToBottomOfChat();
      });
  };

  const scrollToBottomOfChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.documentChatContainer}>
      <Token
        setToken={setToken}
        token={token}
        hasToken={hasToken}
        setHasToken={setHasToken}
        systemHasToken={systemHasToken}
      />
      <Typography variant="h2">Document Q&A</Typography>
      <Typography variant="body1">Upload a photo and ask questions about it</Typography>

      <div className={'appHeader'}>
        <Typography variant="h4">Upload an image</Typography>
        <SelectAndFetchDocumentContent
          handleSelect={handleSelect}
          ocrText={ocrText}
          file={file}
          ocrLoading={ocrLoading}
        />
      </div>

      {/* Chat box */}
      {ocrText && (
        <>
          <Typography variant="h4">Ask a question</Typography>
          <div className={styles.chatBoxContainer}>
            <div className={styles.chatBoxChatContainer}>
              {chats.map((chat: chatsProps, index: number) => {
                if (chat?.question) {
                  return (
                    <div className={styles.bubbleContainer} key={index}>
                      <div className={styles.chatBoxQuestion}>{chat?.question}</div>
                      <Avatar sx={{ width: 42, height: 42 }} />
                    </div>
                  );
                } else if (chat?.answer) {
                  return (
                    <div className={styles.bubbleContainer} key={index}>
                      <Avatar sx={{ bgcolor: 'lightblue', width: 42, height: 42 }} />
                      <div className={styles.chatBoxAnswer}>
                        <pre className={styles.chatBoxPreTag}>{chat?.answer}</pre>
                      </div>
                    </div>
                  );
                } else if (chat?.error) {
                  return (
                    <div className={styles.bubbleContainer} key={index}>
                      <div className={styles.chatBoxError}>{chat?.error}</div>
                    </div>
                  );
                }
              })}
              {chatLoading && (
                <div className={styles.chatBoxLoading}>
                  <CircularProgress size={20} />
                </div>
              )}
              <div ref={chatRef} />
            </div>
            <form className={styles.actionContainer} onSubmit={handleSubmit}>
              <TextField
                label="Ask a question"
                name="question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onSubmit={handleSubmit}
              />
              <Button type="submit" onClick={handleSubmit} disabled={chatLoading || !question}>
                <Send />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
