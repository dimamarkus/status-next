"use client";
import { OpenAiModel } from "#/features/chat/openai";
import { FONTS, MODELS, THEMES } from "#/lib/constants/settings";
import { Features, useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import Button from "#/ui/atoms/Button/Button";

const FeaturesPanel = () => {
  const { toggleShowFeatures, areFeaturesShown, features, setFeatures } = useFeatureToggleContext();
  const handleSetFeature = (key: string, value: string | boolean) => {
    const newFeatures = { ...features, [key]: value };
    setFeatures(newFeatures);
  };

  const ref = useOutsideClick(() => toggleShowFeatures());

  const toggleButton = (
    <Button
      className="btn-ghost btn-square btn-sm btn relative opacity-30"
      onClick={() => toggleShowFeatures()}
      title={(!areFeaturesShown ? "Enter" : "Exit") + " Full-screen"}
    >
      {!areFeaturesShown ? "⚙️" : "❌"}
    </Button>
  );

  if (!areFeaturesShown) {
    return <div className="absolute top-0 left-0 z-10">{toggleButton}</div>;
  }

  const getOptionTogggle = (name: "debugMode" | "useStream", title?: string) => {
    const currentState = features[name];
    return (
      <div>
        <label htmlFor={name} className="label">
          <span className="label-text uppercase text-base-100">{title}</span>
        </label>
        <input
          name={name}
          type="checkbox"
          className="checkbox-primary"
          checked={currentState}
          onChange={(event) => handleSetFeature(name, !currentState)}
        />
      </div>
    );
  };

  const getOptionDropdown = (
    name: keyof Omit<Features, "debugMode" | "useStream">,
    options: string[],
  ) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text uppercase text-base-100">{name}</span>
      </label>
      <select
        name={name}
        className="w-50 select-xs h-fit"
        value={features[name]}
        onChange={(event) => handleSetFeature(name, event.target.value)}
      >
        {options.map((option: string, i: number) => (
          <option key={i} value={option}>
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </div>
  );

  const getOptionRadio = (name: "model", options: OpenAiModel[]) => {
    const currentState = features[name];
    return options.map((option, i) => {
      return (
        <div className="form-control flex flex-col" key={i}>
          <label htmlFor={name + option} className="label">
            <span className="label-text uppercase text-base-100">{option}</span>
          </label>
          <input
            id={name + option}
            name={name}
            type="radio"
            className="radio-primary"
            value={option}
            checked={currentState === option}
            onChange={(event) => handleSetFeature(name, !!event.target.value && option)}
          />
        </div>
      );
    });
  };

  const menu = areFeaturesShown && (
    <div className="absolute top-0 left-0 z-0 flex flex-col gap-4 rounded-br-md bg-black/75 p-8 pt-4 pl-10">
      {getOptionDropdown("theme", THEMES)}
      {/* {getOptionDropdown("layout", LAYOUTS)} */}
      {getOptionDropdown("font", FONTS)}
      {getOptionRadio("model", MODELS)}
      {getOptionTogggle("useStream", "Stream Response")}
      {getOptionTogggle("debugMode", "Prompt Debug")}
      {/* HACK: Empty div to force tailwind to create these font classes */}
      <div className="hidden font-tiempos font-tiemposHeadline font-exo font-avenir font-montserrat font-raleway font-lato font-graphik" />
    </div>
  );

  return (
    <div className="absolute top-0 left-0 z-10" ref={ref}>
      {menu}
      {toggleButton}
    </div>
  );
};

export default FeaturesPanel;