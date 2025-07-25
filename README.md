# Bagtas Information Portal

Information portal web app for the Baranggay Government of Bagtas

## Cloning this project

You need to install [**Node.js**](https://nodejs.org/en) to run this project.

1. Clone the project using `git clone https://github.com/rhetts-software/bagtas-information-portal.git`
2. Install packages `npm install`. This step should be done everytime you pull for changes.

## Running this project

You need a `.env` file in your root folder that contains all the API keys and secrets used in this app. For security purposes, this file is **NOT** and **NEVER SHOULD BE** included in commits. Ask big daddy yuan for the .env file.

1. `npm run dev` to run the web app locally.
2. `npm run test` to run unit tests.

## Project Structure
```
📦 root
├─ public             // assets such as images, fonts, icons
├─ src                // project source code
│  ├─ app             // routing. each folder corresponds to a route
│  ├─ lib             // utility code
│  │  ├─ modules      // functions, classes
│  │  └─ components   // React components
│  └─ __tests__       // for unit testing
└─ .env               // hidden file, should NEVER be committed to repo
```

## Useful Documentations

This project uses the following packages/services for ease of development. Visit these documentation websites for information on usage and development:

1. React: https://react.dev/reference/react
2. Supabase: https://supabase.com/docs/reference/javascript/start
3. Next.js (using App Router): https://nextjs.org/docs
4. Tailwind CSS: https://tailwindcss.com/docs/styling-with-utility-classes
5. React Motion (for animations): https://motion.dev/docs/react-quick-start
