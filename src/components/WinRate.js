import React from "react";
import { useTranslation } from "../i18n/I18nContext";

function WinRate(props) {
  const { t } = useTranslation();
  const correctAnswers = props.correctAnswers;
  const wrongAnswers = props.wrongAnswers;

  return (
    <div className="winRatePanel">
      <label className="correctAnswer spaced unselectable">
        {t('winRate.correct')}: {correctAnswers}{" "}
      </label>
      <label className="wrongAnswer spaced unselectable">
        {" "}
        {t('winRate.wrong')}: {wrongAnswers}
      </label>{" "}
      <label className="unselectable">
        {t('winRate.rate')}:{" "}
        {Math.round(
          (correctAnswers / Math.max(correctAnswers + wrongAnswers, 1)) * 100
        )}
        %
      </label>
    </div>
  );
}

export { WinRate };
