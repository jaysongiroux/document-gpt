# Document GPT
A document toolkit that leverages `tesseract.js` and `openai` to upload a document and process it using different ideas/ techniques.

[![Badge](https://202o2716cl9w.runkit.sh)](http://documentgpt.jasongiroux.com)

## Features
- Given a document, construct a user defined JSON object
- Given a document, ask questions about it

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

## Deploy on Heroku
Currently deployed on heroku Hobby plan

Heroku offers non cold-start API endpoints which leads to a better user experience. Vercel on the other hand, uses cold-start API endpoints which leads to longer execution times.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Deploying on vercel is only possible if you have the pro-plan at this moment since some OCR workers require more than the 10 seconds provided by the free plan to process text heavy images

