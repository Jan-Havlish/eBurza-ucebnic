import React, { useState } from "react";
import {projectFirestore} from "../firebase/config";
import { collection, addDoc } from "firebase/firestore"; 

const Feedback = () => {
    const [showCard, setShowCard] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.feedbackType.value, "e.target.feedbackType.value");
        const feedbackType = e.target.feedbackType.value;
        const feedbackText = e.target.feedbackText.value;
        const feedback = { feedbackType, feedbackText, date: new Date() };
        console.log(feedback);

        const colRef = collection(projectFirestore, "feedback");
        addDoc(colRef, feedback).then(() => {
            console.log("Feedback successfully written!");
        }).catch((error) => {
            console.error("Error writing feedback: ", error);
        });

        e.target.reset();
        setShowCard(false);


    };

    return (
        <div>
            <dialog open={showCard} className="bg-white rounded-lg shadow-lg shadow-agRed p-6 mt-6">

                <h2 className="text-zinc-700">Zde nám můžete zanechat zpětnou vazbu</h2>
                <h3 className="text-zinc-700">nebo ohlásit chyby.</h3>
                <p className="text-agRed">Bude uložena zpětná vezba jen od přihlášených uživatelů, ale neukládá se jméno / email.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="feedbackType">Typ zpětné vazby: </label>
                    <select id="feedbackType">
                        <option value="feedback">Zpětná vazba</option>
                        <option value="bug">Nahlásit chybu</option>
                        <option value="other">Jiné</option>
                    </select><br />
                    <textarea id="feedbackText" name="feedbackText" className="mt-4 w-full"/>
<input type="submit" value="Odeslat" className="blue-button mt-4"/>
                </form>
            </dialog>
            <button className={"fixed bottom-5 right-5 text-white text-l font-bold rounded-lg shadow-xl shadow-agBlue p-4" + (showCard ? " bg-agRed" : " bg-agBlue")} onClick={() => setShowCard(!showCard)}>Zpětná vazba / Chyba</button>
        </div>
    );
};

export default Feedback;
