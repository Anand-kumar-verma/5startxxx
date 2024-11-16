import { Box, Drawer, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const Rule = ({ setOpen2, open2, style }) => {
  const [language, setLanguage] = useState('hindi'); // default language is Hindi

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLanguageToggle = () => {
    setLanguage(prevLang => (prevLang === 'hindi' ? 'english' : 'hindi'));
  };

  // Rules content based on language
  const rulesContent = {
    hindi: (
      <>
        <p className="!text-center">जैकपॉट गेम के नियम</p>
        <p className="text-[10px] py-2">
          1. गेम का अवलोकन
          <br />
          "जैकपॉट" गेम में 0 से 36 तक नंबर वाले स्लॉट होते हैं, जिन्हें तीन रंगों में से एक रंग (लाल, काले, या नीले) में बांटा जाता है। खिलाड़ी इन नंबरों या रंगों पर दांव लगा सकते हैं।
        </p>
        <p className="text-[10px] py-2">
          2. दांव लगाना
          <br />
          * खिलाड़ी नंबरों (0 से 36) या रंगों (लाल, काले, नीले) पर दांव लगा सकते हैं।
          <br />
          * न्यूनतम दांव 10 है, और दांव को 10 के गुणा में बढ़ाया जा सकता है (जैसे 10, 20, 30 आदि)।
        </p>
        <p className="text-[10px] py-2">
          3. दांव लगाने का समय
          <br />
          * खिलाड़ी हर मिनट में दांव लगा सकते हैं।
          <br />
          * अंतिम मिनट में, दांव 15 सेकंड पहले तक लगाए जा सकते हैं। अंतिम 15 सेकंड में दांव लगाना बंद हो जाएगा।
        </p>
        <p className="text-[10px] py-2">
          4. जीतने की शर्तें
          <br />
          * अगर गेंद 0 पर गिरती है: दांव की राशि का x50 भुगतान होता है।
          <br />
          * अगर गेंद 1 से 36 तक के किसी नंबर पर गिरती है: दांव की राशि का x35 भुगतान होता है।
          <br />
          * अगर गेंद काले स्लॉट पर गिरती है: दांव की राशि का x2 भुगतान होता है।
          <br />
          * अगर गेंद लाल स्लॉट पर गिरती है: दांव की राशि का x2 भुगतान होता है।
          <br />
          * अगर गेंद नीले स्लॉट पर गिरती है: दांव की राशि का x5 भुगतान होता है।
        </p>
        <p className="text-[10px] py-2">
          5. दांव लगाने की पाबंदियाँ
          <br />
          * प्रत्येक राउंड के अंतिम 15 सेकंड में दांव नहीं लगाए जा सकते हैं।
          <br />
          <br />
          शुभकामनाएँ, और आपको जैकपॉट मिलने की शुभकामनाएँ!
        </p>
      </>
    ),
    english: (
      <>
        <p className="!text-center">Jackpot Game Rules</p>
        <p className="text-[10px] py-2">
          1. Game Overview
          <br />
          The game "Jackpot" consists of slots numbered from 0 to 36, each assigned one of three colors: Red, Black, or Blue. Players can place bets on any of these numbers or colors.
        </p>
        <p className="text-[10px] py-2">
          2. Placing Bets
          <br />
          * Players can place bets on numbers (0 to 36) or colors (Red, Black, Blue).
          <br />
          * The minimum bet is 10, and bets can be increased in increments of 10 (e.g., 10, 20, 30, etc.).
        </p>
        <p className="text-[10px] py-2">
          3. Betting Time
          <br />
          * Players can place bets every minute.
          <br />
          * In the final minute, betting is allowed until 15 seconds before the round ends. The screen will block betting in the last 15 seconds.
        </p>
        <p className="text-[10px] py-2">
          4. Winning Conditions
          <br />
          * If the ball lands on 0: The payout is x50 of the bet amount.
          <br />
          * If the ball lands on any number from 1 to 36: The payout is x35 of the bet amount.
          <br />
          * If the ball lands on a Black slot: The payout is x2 of the bet amount.
          <br />
          * If the ball lands on a Red slot: The payout is x2 of the bet amount.
          <br />
          * If the ball lands on a Blue slot: The payout is x5 of the bet amount.
        </p>
        <p className="text-[10px] py-2">
          5. Betting Restrictions
          <br />
          * Bets cannot be placed or adjusted in the last 15 seconds of each round.
          <br />
          <br />
          Good luck, and may you hit the Jackpot!
        </p>
      </>
    ),
  };

  return (
    <>
      <Drawer
        className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
        sx={{
          "&>div": {
            background: "transparent",
            width: "320px",
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
            background: "black",
            padding: "10px",
            color: "white",
            borderColor: "yellow  !important",
          }}
        >
          <div
            className="!text-white text-[10px] !text-left w-8 px-1 border border-yellow-400"
            onClick={() => {
              setOpen2(false);
            }}
          >
            Back
          </div>
          <div className="flex flex-col !pl-1">
            <Button
              variant="outlined"
              size="small"
              onClick={handleLanguageToggle}
              sx={{
                alignSelf: "flex-end",
                marginBottom: "10px",
                color: "white",
                borderColor: "yellow",
              }}
            >
              {language === 'hindi' ? 'English Rules' : 'हिंदी नियम'}
            </Button>

            {rulesContent[language]}
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default Rule;
