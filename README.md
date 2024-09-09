# Padel Team Generator

A Next.js application for creating balanced teams for padel sessions.

## Overview

Padel Team Generator helps organize players into fair teams across multiple courts and rounds. It's built with modern web technologies and offers a responsive design for various screen sizes.

## Features

- Configure number of courts and rounds
- Input player names
- Generate balanced teams automatically
- Save generated teams to local storage
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Main application components and pages
- `components/`: Reusable UI components
- `lib/`: Utility functions
- `public/`: Static assets

## Key Components

### InitialPage

Handles the initial setup for courts and rounds.

### PadelTeamGenerator

Main component managing application state, player input, and team generation.

## Customization

Modify `tailwind.config.ts` and `app/globals.css` to customize the application's appearance.

## Development Features

A development-only feature for populating random names is available when `NEXT_PUBLIC_ENVIRONMENT` is set to 'development'.

## Deployment

Deploy easily using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## Contributing

Contributions are welcome! Please submit a Pull Request with your proposed changes.

## License

This project is open source under the MIT License.

## Acknowledgements

- Next.js team for the excellent framework
- shadcn for the UI components
- All contributors and supporters of this project

---

For more detailed information on using Next.js, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)