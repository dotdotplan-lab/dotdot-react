import {useRef, useState } from 'react';

import './App.css';

// TinyMCE 로컬 import (v8.5.1)
import tinymce from 'tinymce/tinymce';

import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/skins/ui/oxide/skin.css';

// 필요한 플러그인만 import
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';

// plugin resources
import 'tinymce/plugins/emoticons/js/emojis';
import TinyMCEExample from "./sample/TinyMCEExample.jsx";

// global 등록
window.tinymce = tinymce;

function App() {
    // 혹시 모듈 로딩 순서 문제 방지
    if (typeof window !== 'undefined' && !window.tinymce) {
        window.tinymce = tinymce;
    }

    const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
      <>
        <TinyMCEExample />
      </>
  );
}

export default App;
