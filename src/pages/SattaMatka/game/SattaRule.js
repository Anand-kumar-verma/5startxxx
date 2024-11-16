import React, { useEffect, useState } from "react";
import { Box, Drawer, Button } from "@mui/material";
import { Close } from "@mui/icons-material";

const SattaRule = ({ setOpen2, open2, style }) => {
    const [language, setLanguage] = useState("hi"); // 'hi' for Hindi, 'en' for English

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === "hi" ? "en" : "hi"));
    };

    // Hindi content
    const hindiContent = (
        <>
            <p className="!text-[10px] py-2 pt-5">
                गेम का नाम: सट्टा मटका
                <br />
                सट्टा मटका में चार अलग-अलग बेटिंग प्रकार होते हैं:
                <br />1. गली <br />
                2. देसावर <br />
                3. गाज़ियाबाद <br />
                4. फरिदाबाद
            </p>
            <p className="text-[10px] py-2 ">
                चारों प्रकार में एक ही बेटिंग संरचना होती है, जिसमें 00 से 99 तक के स्लॉट्स और दो अतिरिक्त बेटिंग विकल्प होते हैं:
                <br />
                1. अंदर (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) .
                <br /> 2. बहार (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) .
            </p>
            <p className="text-[10px] py-2 ">
                खेलने के चरण:
                <br /> <br />
                1. बेट्स लगाना <br />
                - खिलाड़ी 00 से 99 तक के नंबरों और/या अंदर/बाहर पर बेट्स लगा सकते हैं।
                <br /> - न्यूनतम बेट: <br />
                - 00 से 99 स्लॉट्स: न्यूनतम बेट 10। <br />
                - अंदर/बाहर स्लॉट्स: न्यूनतम बेट 5।
            </p>
            <p className="text-[10px] py-2 ">
                2. बेटिंग का समय
                <br />
                - बेट्स हर 30 मिनट में लगाए जा सकते हैं।
                <br /> - बेटिंग विंडो हर राउंड के अंत से 5 मिनट पहले बंद हो जाती है, और इस अवधि के दौरान कोई बेट नहीं लगाया जा सकता है।
            </p>
            <p className="text-[10px] py-2 ">
                3. जीतने की शर्तें
                <br />
                - यदि जीतने वाली संख्या 00 से 99 के बीच है: पayout x97 होगी।
                <br />
                - यदि जीतने वाला संयोजन अंदर/बाहर है: पayout x100 होगी।
            </p>
            <p className="text-[10px] py-2 ">
                4. बेटिंग की सीमाएँ
                <br />
                - बेटिंग राउंड के अंतिम 5 मिनट में किसी भी स्लॉट के लिए बेट नहीं लगाया जा सकता है।
                <br />
                <br />
                खेल का आनंद लें, और शुभकामनाएँ!
            </p>
        </>
    );

    // English content
    const englishContent = (
        <>
            <p className="!text-[10px] py-2 pt-5">
                Game Name: Satta Matka
                <br />
                Satta Matka offers four different betting types:
                <br />1. Gali <br />
                2. Desawar <br />
                3. Ghaziabad <br />
                4. Faridabad
            </p>
            <p className="text-[10px] py-2 ">
                All four types share the same betting structure, with slots ranging from 00 to 99, along with two additional betting options:
                <br />
                1. Andar (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) .
                <br /> 2. Bahar (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) .
            </p>
            <p className="text-[10px] py-2 ">
                Steps to Play:
                <br /> <br />
                1. Placing Bets <br />
                - Players can place bets on numbers from 00 to 99 and/or on Andar/Bahar.
                <br /> - Minimum bet: <br />
                - 00 to 99 slots: Minimum bet is 10. <br />
                - Andar/Bahar slots: Minimum bet is 5.
            </p>
            <p className="text-[10px] py-2 ">
                2. Betting Time
                <br />
                - Bets can be placed every 30 minutes.
                <br /> - The betting window closes 5 minutes before the end of each round, and no bets can be placed or adjusted during this period.
            </p>
            <p className="text-[10px] py-2 ">
                3. Winning Conditions
                <br />
                - If the winning number is between 00 and 99: The payout is x97 of the bet amount.
                <br />
                - If the winning combination is Andar/Bahar: The payout is x100 of the bet amount.
            </p>
            <p className="text-[10px] py-2 ">
                4. Betting Restrictions
                <br />
                - No bets can be placed or changed in the final 5 minutes of each betting round for both the number slots and Andar/Bahar options.
                <br />
                <br />
                Enjoy the game, and good luck!
            </p>
        </>
    );

    return (
        <>
            <Drawer
                className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
                sx={{
                    "&>div": {
                        background: "transparent",
                        width: "320px",
                        height: "90vh",
                        ...style.flex,
                    },
                }}
                anchor="top"
                open={open2}
                onClose={() => {
                    setOpen2(false);
                }}
            >
                <Box
                    className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
                    sx={{
                        width: "100%",
                        height: "100%",
                        background: "#0A001B ",
                        padding: "10px",
                        color: "white",
                        borderColor: "yellow !important",
                    }}
                >
                    <div
                        className="!text-white text-[10px] flex justify-between px-1"
                        onClick={() => {
                            setOpen2(false);
                        }}
                    >
                        <Close />
                        <p className="!text-center !text-lg">Satta Matka Game Rules</p>
                    </div>
                    <div className="flex flex-col !pl-1">
                        <Button
                            onClick={toggleLanguage}
                            variant="contained"
                            sx={{ marginBottom: "10px", width: "100%" }}
                        >
                            {language === "hi" ? "Switch to English" : "Switch to Hindi"}
                        </Button>

                        {language === "hi" ? hindiContent : englishContent}
                    </div>
                </Box>
            </Drawer>
        </>
    );
};

export default SattaRule;
