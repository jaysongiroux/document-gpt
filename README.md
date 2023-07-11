# Document GPT
a document toolkit that leverages `tesseract.js` and `openai` to upload a document and process it using different ideas/ techniques.

## Getting Started
1. Get an OpenAI API Token
   1. (optional) Add `OPEN_AI_API_TOKEN=<TOKEN>` to `.env` file and load it into your env
2. install dependencies
   1. Run `yarn install`
3. Run development server
   1. Run `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building
```bash
yarn build
```

## Notes:
You can deploy without `OPEN_AI_API_TOKEN` as an environment variable which will require the user to submit their own Open AI API Token.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
