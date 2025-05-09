
const CHATBOT_RESPONSES = [
    ["你好", "你好！我是校園助手，很高興為您服務！\n您可以詢問我關於：\n- 入學資訊\n- 系所介紹\n- 住宿申請\n- 學務相關\n- 學習資源\n- 考試時間\n- 設施位置\n- 開學結業\n- 學雜費\n- 畢業門檻\n- 學校地址\n等問題，我會盡力為您解答！", "嗨,哈囉,您好,hi,hello"],
    ["入學相關", "入學資訊請參考：\n<a href='https://recruit.cute.edu.tw/' target='_blank'>招生資訊網</a>\n\n提供招生管道日程、科系總覽、文宣下載、入學優惠等資訊。\n若您想了解報名方式、備審資料、入學意願表填寫，請輸入「報名」、「備審」、「意願表」。", "入學,招生,報名,備審,意願表,考試,新生,錄取"],
    ["系所相關", "系所資訊請參考：\n<a href='https://www.cute.edu.tw/academic.html' target='_blank'>學術單位網頁</a>\n\n例如：資訊工程系提供 AI、物聯網、資安課程模組，搭配證照與競賽驗證成果。\n若想了解特定系所，請輸入系所名稱，例如「資訊工程系」。", "系所,科系,學系,學院,課程,師資,教授,老師,選課,學分"],
    ["住宿相關", "住宿資訊請參考：\n新竹校區宿舍：地上7層、地下1層，提供四人房與無障礙套房。\n台北校區弘道樓女生宿舍限外縣市女新生申請。\n申請詳情：\n<a href='https://ccnt4.cute.edu.tw/ipiac/page05_4.html' target='_blank'>新竹宿舍</a> | <a href='https://m.cute.edu.tw/CutePublicFile/e736f941-1dce-4910-a906-c20452860095/113%E8%87%BA%E5%8C%97%E6%A0%A1%E5%8D%80%E5%A5%B3%E7%94%9F%E5%AE%BF%E8%88%8D%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5%28%E6%96%B0%E7%94%9F%E6%89%8B%E5%86%8A%29-%E7%B6%B2%E8%B7%AF%E7%89%88.pdf' target='_blank'>台北宿舍</a>", "住宿,宿舍,住宿費,申請,入住,退宿,搬遷,生活公約,宿舍規定"],
    ["學務相關", "學務相關請參考：\n<a href='https://osa.gm.cute.edu.tw/' target='_blank'>學生事務處</a>\n\n包含：課外活動、生活輔導、衛生保健、學生輔導中心、原住民族學生資源中心。\n如想了解獎學金、社團、輔導，請輸入「獎學金」、「社團」、「輔導」。", "學務,獎學金,社團,輔導,生活服務,校園安全,學生會,課外活動"],
    ["學習資源", "學習資源請參考：\n<a href='https://moodle.cute.edu.tw/' target='_blank'>moodle學習平台</a> | <a href='https://dib.gm.cute.edu.tw/%E5%AD%B8%E7%BF%92%E8%B3%87%E6%BA%90/%E6%A0%A1%E5%85%A7%E5%AD%B8%E7%BF%92%E8%B3%87%E6%BA%90' target='_blank'>CUTe雲</a>\n\n提供線上課程、教材、作業繳交、成績查詢、圖書館資源、語言自學中心。", "學習,資源,圖書館,線上課程,教材,作業,成績,討論區,數位學習"],
    ["考試時間", "考試資訊：\n- 期中考：約學期第9周\n- 期末考：約學期第18周\n詳細安排請參考：\n<a href='https://www.cute.edu.tw/calendar.html' target='_blank'>校園行事曆</a>", "期中考,期末考,考試,考試時間,行事曆,考試範圍,考試規則"],
    ["學校設施", "校園設施包括：\n- 休閒活動中心：球館、游泳館、SPA池、蒸氣室\n- 圖書館：語言自學中心、視聽區\n詳情請參考：\n<a href='https://recruit.cute.edu.tw/university_exposition/campus_life/' target='_blank'>校園生活</a>", "設施,圖書館,體育館,運動,休閒,球館,游泳館,校園設施"],
    ["學雜費", "學雜費資訊：\n查詢與繳費請至：\n<a href='https://sub.cute.edu.tw/onlinePay/' target='_blank'>繳費專區</a>\n\n提供線上查詢繳費單、ATM繳費、銀行臨櫃繳費服務。\n如需就學貸款，請洽學生事務處。", "學雜費,學費,雜費,繳費,減免,貸款,低收入戶"],
    ["畢業門檻", "畢業門檻：\n詳情：\n<a href='https://www.cute.edu.tw/~gec/intro/student.html' target='_blank'>學生專區</a>\n\n- 學分要求\n- 必修與通識課程\n- 實習要求\n- 外語學習成就評量", "畢業,畢業門檻,學分,必修,通識,實習,證照,語言能力"],
    ["學校地址", "校區地址：\n- 台北校區：台北市文山區興隆路三段56號（捷運萬芳醫院站步行5分鐘）\n- 新竹校區：新竹縣湖口鄉中山路三段530號（台鐵北湖車站步行5分鐘）\n交通資訊：<a href='https://recruit.cute.edu.tw/university_exposition/transportation/' target='_blank'>點我查看</a>", "地址,交通,地圖,周邊,捷運,公車,位置"],
    ["退出", "感謝您的使用！祝您有美好的一天！如有問題隨時再來詢問我。", "再見,掰掰,bye,goodbye,結束,關閉"]
];
