import React, { useEffect, useRef, useState } from "react";
import MarkdownView, { GlobalConfiguration } from 'react-showdown';

import 'showdown-katex';
import { useTranslation } from '../i18n/I18nContext';

require('../extensions/MarkdownTiles.js');

const showdownKatex = GlobalConfiguration.getExtension('showdownKatex')[0];
const markdownTiles = GlobalConfiguration.getExtension('markdowntiles')[0];


function HelpPanel(props) {
  const { currentLanguage } = useTranslation();
  const onClickOutside = props.onClickOutside;
  const isOpen = props.isOpen;

  const ref = useRef(null);

  const [mdContent, setMdContent] = useState('');

  useEffect(() => {
    // Try to load language-specific help file, fall back to English if not found
    const tryLoadHelpFile = async () => {
      try {
        const mdFilePath = require(`../helpPages/scoring.${currentLanguage}.md`);
        const response = await fetch(mdFilePath);
        const text = await response.text();
        setMdContent(text);
      } catch (error) {
        // Fall back to English if language-specific file doesn't exist
        try {
          const mdFilePath = require('../helpPages/scoring.en.md');
          const response = await fetch(mdFilePath);
          const text = await response.text();
          setMdContent(text);
        } catch (fallbackError) {
          console.error('Error loading help file:', fallbackError);
        }
      }
    };

    tryLoadHelpFile();
  }, [currentLanguage]);

  var elementExists = document.getElementById("mySidenav");
  if (elementExists) {
    if (isOpen) {
      document.getElementById("mySidenav").classList.remove("closedSideNav");
    } else {
      document.getElementById("mySidenav").classList.add("closedSideNav");
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return <div id="mySidenav" class="sidenav closedSideNav">
    <MarkdownView
      markdown={mdContent}
      options={{ tables: true, emoji: true, parseImgDimensions: true}}
      extensions= {[showdownKatex,markdownTiles]}
    />
  </div>;
}

export { HelpPanel };
