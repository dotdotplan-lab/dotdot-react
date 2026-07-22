import {useRef, useState } from 'react';

import './App.css';

// TinyMCE 로컬 import (v8.5.1)
import tinymce from 'tinymce/tinymce';

import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/skins/ui/oxide/skin.css';

// 필요한 플러그인만 import
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

// plugin resources
import 'tinymce/plugins/emoticons/js/emojis';
import {Header} from "./layouts/Header.jsx";
import MainSpace from "./layouts/MainSpace.jsx";
import {Outlet} from "react-router";

// tinymce editor global 변수 등록
window.tinymce = tinymce;

function App() {
    // tinymce editor 모듈 로딩 순서 문제 방지
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
          <Header />
          <Outlet />
      </>
  );
}

export default App;
