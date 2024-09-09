
# Padel Team Generator

Padel Team Generator is a Next.js application designed to create balanced teams for padel sessions. It helps organize players into fair teams across multiple courts and rounds.

## Features

- Set the number of available courts and rounds
- Input player names
- Generate balanced teams for each round
- Responsive design for various screen sizes
- Local storage for saving generated teams

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application components and pages
- `components/`: Reusable UI components
- `lib/`: Utility functions
- `public/`: Static assets

## Key Components

### InitialPage

This component handles the initial setup, allowing users to select the number of courts and rounds.

### PadelTeamGenerator

The main component that manages the state of the application, including player input and team generation.

## Customization

You can customize the appearance of the application by modifying the Tailwind CSS configuration in `tailwind.config.ts` and the global styles in `app/globals.css`.

## Development

The project includes a development-only feature to populate random names for testing purposes. This feature is only available when the `NEXT_PUBLIC_ENVIRONMENT` variable is set to 'development'.

## Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
