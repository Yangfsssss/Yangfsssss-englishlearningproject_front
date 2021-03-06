import React, { useState } from "react";

import { Div } from "../../../styledComponents/General";

import StudyReviewDaily from "./StudyReviewDaily";
import DisplayScreen from "./DisplayScreen";

import { Section,SectionItem } from "../../../types";

const EnglishReview: React.FC<{ sections: Section[]; visibility: boolean }> = ({
  sections,
  visibility
}) => {
  const [choseItem, setChoseItem] = useState<SectionItem|null>(null);

  if (!sections) return null;
  else
    return (
      <Div
        display={visibility ? "flex" : "none"}
        width="60em"
        // height="80%"
        // position="absolute"
        // left="50%"
        // top="50%"
        // transform="translate(-50%,-50%)"
        // border="1px solid #bfa"
      >
        <Div width="60%" margin="0 10px 0 0">
          {sections
            .map((section) => (
              <StudyReviewDaily section={section} setChoseItem={setChoseItem} />
            ))
            .reverse()}
        </Div>

        <Div width="35%" overflow="auto">
          <DisplayScreen choseItem={choseItem} />
        </Div>
      </Div>
    );
};

export default EnglishReview;
