import React, { useState, FormEvent } from "react";

interface ApiResponse {
    message: string;
}

/*
------------------------------
This is gonna get deleted, but just just needed sum temporary for now.
Most of this is just a bunch of shit copy pasted 6 times lol
*/

const VerifyComponent: React.FC = () => {
    const [guessX, setGuessX] = useState<string>("");
    const [guessY, setGuessY] = useState<string>("");
    const [guessZ, setGuessZ] = useState<string>("");

    const [actualX, setActualX] = useState<string>("");
    const [actualY, setActualY] = useState<string>("");
    const [actualZ, setActualZ] = useState<string>("");

    const [res, setResponseMessage] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // 


        const guess = { x: guessX, y: guessY, z: guessZ };
        const actual = { x: actualX, y: actualY, z: actualZ };

        try {
            const response = await fetch("http://localhost:4000/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guess, actual }), 
            });

            const data: ApiResponse = await response.json();

            if (response.status === 422) {
                setResponseMessage("Error: " + data.message);
            } else {
                setResponseMessage("Success: " + JSON.stringify(data));
            }
        } catch (error) {
            setResponseMessage("Error: " + (error as Error).message);
        }
    };

    return (
        <div>
            <h2>Test Verify Endpoint</h2>
            <form onSubmit={handleSubmit}>
                <h3>Guess</h3>
                <div>
                    <label>
                        Guess X:
                        <input
                            type="text"
                            value={guessX}
                            onChange={(e) => setGuessX(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Guess Y:
                        <input
                            type="text"
                            value={guessY}
                            onChange={(e) => setGuessY(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Guess Z:
                        <input
                            type="text"
                            value={guessZ}
                            onChange={(e) => setGuessZ(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <h3>Actual</h3>
                <div>
                    <label>
                        Actual X:
                        <input
                            type="text"
                            value={actualX}
                            onChange={(e) => setActualX(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Actual Y:
                        <input
                            type="text"
                            value={actualY}
                            onChange={(e) => setActualY(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Actual Z:
                        <input
                            type="text"
                            value={actualZ}
                            onChange={(e) => setActualZ(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
            {res && <p>{res}</p>}
        </div>
    );
};

export default VerifyComponent;
