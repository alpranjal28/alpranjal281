// catch-all-segments

//eg: localhost:3000/docs/feature1/concept1  --chaining  [...slug]
//eg: localhost:3000/docs/feature1   --chaining [...slug]
//eg: localhost:3000/docs/   --optionalChaining [[...slug]]


export default function Docs({
    params,
}: {
    params: {
        slug: string[];
    };
}) {
    if (params.slug?.length === 2) {
        return (
            <h1>
                Viewing docs for feature {params.slug[0]} and concept{" "}
                {params.slug[1]}
            </h1>
        );
    } else if (params.slug?.length === 1) {
        return <h1>Viewing docs for feature {params.slug[0]}</h1>;
    }

    return (
        <>
            <h1>Docs Home Page</h1>
        </>
    );
}
