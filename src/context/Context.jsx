import { createContext } from 'react';
import generateAnswer from '../config/gemini';
import { useState } from 'react';

export const Context = createContext();

const ContextProvider = (props) => {


    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState([]);

    
    // This logical function is used to get a delay effect after data is fetched 
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
setResultData(prev => prev+nextWord)
        }, 75 * index);
    }
 
    // function for newChat
    const newChat = () => {
        setLoading(false);
        setShowResult(false)
    }


    // Creating a onSent async function for sending our own input as a user
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)

        let response;
        if (prompt != undefined) {
           response = await generateAnswer(input);
        }
        else{
            setrecentPrompt(input)
            setprevPrompts(prev =>[...prev , input])
            response = await generateAnswer(input);
        }
      

        // logic for getting the clean text output
        let responseArray = response.split("**");
        let newResponse = ""; //this will eradicate undefined on 
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 != 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {

            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ")

        }  
        setLoading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompts,
        setprevPrompts,
        recentPrompt,
        setrecentPrompt,
        input,
        setInput,

        onSent,
        showResult,
        loading,
        resultData,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

