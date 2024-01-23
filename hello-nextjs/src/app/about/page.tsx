export const metadata = {
    title: "TypeScript and NextJS",
    description: "About page",
};//static metadata

export default function About() {
    return (
        <div>
            <h1>About</h1>
            <p>This about page is in separate folder</p>
            <p>each folder corresponds to a different route</p>
        </div>
    );
}
