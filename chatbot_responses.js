const CHATBOT_RESPONSES = [
    ["你好", "你好！我是校園助手，很高興為您服務！\n您可以詢問我關於：\n1. -入學資訊\n2. -系所介紹\n3. -住宿申請\n4. -學務相關\n5. -學習資源\n6. -考試時間\n7. -設施位置\n8. -開學結業\n9. -學雜費\n10. -畢業門檻\n11. -學校地址\n12. -選課相關\n等問題，我會盡力為您解答！", "?,嗨,哈囉,您好,hi,hello"],
    ["入學相關", "入學資訊請參考：\n<a href='https://recruit.cute.edu.tw/' target='_blank'>招生資訊網</a>\n\n提供招生管道日程、科系總覽、文宣下載、入學優惠等資訊。", "入學,招生,報名,備審,意願表,新生,錄取"],
    ["系所相關", "本校系所一覽：\n\n規劃與設計學院：\n- <a href='https://arch.gm.cute.edu.tw/' target='_blank'>建築系</a>\n- <a href='https://dcivil.gm.cute.edu.tw/' target='_blank'>土木與防災系</a>\n- <a href='https://dinte.gm.cute.edu.tw/' target='_blank'>室內設計系</a>\n- <a href='https://web.cute.edu.tw/dvcd/' target='_blank'>視覺傳達設計系</a>\n- <a href='https://dfvp.cute.edu.tw/' target='_blank'>影視設計系</a>\n- <a href='https://dmd.cute.edu.tw/' target='_blank'>數位多媒體設計系</a>\n- <a href='https://sonic0933.wixsite.com/cutemusic/' target='_blank'>學士後多元培力學程數位音樂音效專班</a>\n\n管理學院：\n- <a href='https://dba.gm.cute.edu.tw/' target='_blank'>企業管理系</a>\n- <a href='https://atsm.gm.cute.edu.tw/' target='_blank'>企業管理雙學士學位學程</a>\n- <a href='https://dib.gm.cute.edu.tw/' target='_blank'>智慧商務經營管理系</a>\n- <a href='https://dfin.gm.cute.edu.tw/' target='_blank'>財務金融系</a>\n- <a href='https://dml.gm.cute.edu.tw/' target='_blank'>行銷與流通管理系</a>\n- <a href='https://deng.gm.cute.edu.tw/' target='_blank'>應用英語系</a>\n- <a href='https://dtlm.gm.cute.edu.tw/' target='_blank'>觀光與休閒事業管理系</a>\n\n資訊學院：\n- <a href='https://sites.google.com/view/cutedmis' target='_blank'>資訊管理系</a>\n- <a href='https://dcsie.gm.cute.edu.tw/' target='_blank'>資訊工程系</a>\n\n若想了解特定系所詳細資訊，請點擊上方連結或輸入系所名稱。", "系所,科系,學系,學院,課程,師資,教授,老師,選課,學分"],
    ["住宿相關", "住宿資訊請參考：\n新竹校區宿舍：地上7層、地下1層，提供四人房與無障礙套房。\n台北校區弘道樓女生宿舍限外縣市女新生申請。\n申請詳情：\n<a href='https://ccnt4.cute.edu.tw/ipiac/page05_4.html' target='_blank'>新竹宿舍</a> | <a href='https://m.cute.edu.tw/CutePublicFile/e736f941-1dce-4910-a906-c20452860095/113%E8%87%BA%E5%8C%97%E6%A0%A1%E5%8D%80%E5%A5%B3%E7%94%9F%E5%AE%BF%E8%88%8D%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5%28%E6%96%B0%E7%94%9F%E6%89%8B%E5%86%8A%29-%E7%B6%B2%E8%B7%AF%E7%89%88.pdf' target='_blank'>台北宿舍</a>", "住宿,宿舍,住宿費,申請,入住,退宿,搬遷,生活公約,宿舍規定"],
    ["學務相關", "學務相關請參考：\n<a href='https://osa.gm.cute.edu.tw/' target='_blank'>學生事務處</a>\n\n包含：課外活動、生活輔導、衛生保健、學生輔導中心、原住民族學生資源中心。\n如想了解獎學金、輔導，請輸入「獎學金」、「輔導」。", "學務,輔導,生活服務,校園安全,學生會,課外活動"],
    ["學習資源", "學習資源請參考：\n<a href='http://moodle.cute.edu.tw/' target='_blank'>moodle學習平台</a> | <a href='https://qt.cute.edu.tw/' target='_blank'>CUTe雲</a>\n\n提供線上課程、教材、作業繳交、成績查詢、圖書館資源、語言自學中心。", "學習,資源,圖書館,線上課程,教材,作業,成績,討論區,數位學習,moodle"],
    ["考試時間", "考試資訊：\n- 期中考：約學期第9周\n- 期末考：約學期第18周\n詳細安排請參考：\n<a href='https://www.cute.edu.tw/calendar.html' target='_blank'>校園行事曆</a>", "期中考,期中時間,期末時間,期末考,考試,考試時間,行事曆,考試範圍,考試規則"],
    ["學校設施", "校園設施包括：\n- 休閒活動中心：球館、游泳館、SPA池、蒸氣室\n- 圖書館：語言自學中心、視聽區\n詳情請參考：\n<a href='https://recruit.cute.edu.tw/university_exposition/campus_life/' target='_blank'>校園生活</a>", "設施,圖書館,體育館,運動,休閒,球館,游泳館,校園設施"],
    ["學雜費", "學雜費資訊：\n查詢與繳費請至：\n<a href='https://sub.cute.edu.tw/onlinePay/' target='_blank'>繳費專區</a>\n\n提供線上查詢繳費單、ATM繳費、銀行臨櫃繳費服務。\n如需就學貸款，請洽學生事務處。", "學雜費,學費,雜費,繳費,減免,就學貸款,學貸,貸款,低收入戶"],
    ["畢業門檻", "畢業門檻：\n- 學分要求\n- 必修與通識課程\n- 實習要求\n- 外語學習成就評量\n詳情：\n<a href='https://www.cute.edu.tw/~gec/intro/student.html' target='_blank'>學生專區</a>", "畢業,畢業門檻,學分,必修,通識,實習,證照,語言能力"],
    ["學校地址", "校區地址：\n- 台北校區：台北市文山區興隆路三段56號（捷運萬芳醫院站步行5分鐘）\n- 新竹校區：新竹縣湖口鄉中山路三段530號（台鐵北湖車站步行5分鐘）\n交通資訊：<a href='https://recruit.cute.edu.tw/university_exposition/transportation/' target='_blank'>點我查看</a>", "地址,交通,地圖,周邊,捷運,公車,位置"],
    ["開學結業", "詳細時間請參考：\n<a href='https://www.cute.edu.tw/calendar.html' target='_blank'>校園行事曆</a>", "開學,結業,學期,行事曆,開學日,結業日,學期時間"],
    ["選課相關", "選課系統請至：\n<a href='http://192.192.78.204/Finalcs_select1/std_login.aspx' target='_blank'>選課系統</a>\n\n注意事項：\n1. 選課系統帳號密碼與單一入口帳號密碼一致\n2. 若忘記密碼：\n   - 請至圖資中心重置密碼\n   - 或於單一入口網站使用備用信箱重置\n3. 首次登入密碼預設為身份證字號\n4. 修改密碼請至<a href='http://iq.cute.edu.tw' target='_blank'>單一入口網</a>\n\n※本系統僅限使用微軟IE瀏覽器", "選課,加退選,選課系統,課程,學分,選修,必修,通識"],
    ["提前畢業", "若符合學分與成績門檻，經系主任與教務處核准可申請提前畢業。\n\n<a href='https://drive.google.com/file/d/1SsIL2psAFuARNFVsLeUlz8XU7-gqqfQd/view' target='_blank'>大學部成績優異學生提前畢業申請表</a>", "提前畢業,加速畢業"],
    ["心理諮詢", "學校提供免費心理諮詢服務，請洽學生輔導中心預約:\n<a href='https://sites.google.com/gm.cute.edu.tw/student-counseling-center/%E5%AD%B8%E8%BC%94%E4%B8%AD%E5%BF%83%E9%A6%96%E9%A0%81' target='_blank'>學生輔導中心</a>", "心理,諮商,心理輔導"],
    ["退出", "感謝您的使用！祝您有美好的一天！如有問題隨時再來詢問我。", "再見,掰掰,bye,goodbye,結束,關閉"],
    
    // 教務處 Q&A 擴充
    ["學位證書補發", "您可以親自或委託他人至聯合服務中心申請學位證書補發，需攜帶身分證明文件，並繳交工本費。詳細流程請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "畢業證書,學位證書,補發,遺失,破損"],
    ["中文成績單申請", "您可以透過成績列印暨自動化繳費系統申請中文成績單，或親自至聯合服務中心辦理。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "成績單,中文成績單,申請成績單"],
    ["在學證明書申請", "持學生證正本至所屬教務單位填寫申請表，即可申請在學證明書。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "在學證明,在學證明書,申請在學證明"],
    ["學生證補辦", "請先至校園系統單一入口網站掛失學生證，然後填寫補發申請表，並繳交工本費。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "學生證,補辦學生證,掛失,補發"],
    ["成績排名證明申請", "持學生證或身分證至聯合服務中心填寫申請表，並繳交工本費，即可申請成績排名證明。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "成績排名,排名證明,申請排名證明"],
    ["英文證明書申請", "您可以申請英文版的學位證書、在學證明書、修業證明書及成績單，需填寫申請表並繳交工本費。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "英文證明,英文成績單,英文畢業證書"],
    ["姓名更改", "若已至戶政機關改名，請攜帶相關證明文件至教務單位辦理姓名更改手續。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "改名,姓名更改,更改姓名"],
    ["修業證明申請", "退學學生如在校肄業滿一學期，可申請修業證明書，需填寫申請表並繳交相關文件。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "修業證明,肄業證明,申請修業證明"],
    ["學位證書影本加蓋校印", "請持學位證書正本及影本至教務單位申請加蓋校印，亦可委託他人或通訊辦理。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "校印,關防,加蓋校印,畢業證書影本"],
    ["學雜費繳費單下載", "您可以至土地銀行代收學雜費服務網或學校單一入口服務網下載並列印繳費單。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "學雜費,繳費單,下載繳費單"],
    ["逾期繳費處理", "若已逾繳費期限，請儘速依註冊通知上的繳費方式繳納，並與教務單位聯繫。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "逾期繳費,補繳學費,學雜費逾期"],
    ["註冊章蓋章", "註冊完成後，可由班級幹部統一或個人自行交至所屬教務單位加蓋註冊印章。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "註冊章,蓋章,學生證蓋章"],
    ["休學手續辦理", "請先與導師晤談，填寫休學申請表，並經相關單位簽辦後交至教務單位辦理。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "休學,休學申請,辦理休學"],
    ["休學期間當兵", "請持徵集令正本及影本交至教務單位辦理延長休學，退伍後再辦理復學手續。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "當兵,徵集令,延長休學"],
    ["提前復學", "若欲提前復學，需符合相關規定，並辦理復學手續，請洽教務單位。詳情請參考：<a href='https://acad.gm.cute.edu.tw/qa' target='_blank'>教務處Q&A</a>", "提前復學,復學申請,休學復學"],
    ["國際交流", "國際及兩岸交流資訊請參考：\n<a href='https://intel.cute.edu.tw/' target='_blank'>國際及兩岸交流處</a>\n\n提供以下服務：\n- 外國學生招生\n- 僑港澳生招生\n- 國際專修部\n- 產學合作國際專班\n- 海外研修\n- 來校研修\n- 合作交流學校\n\n聯絡資訊：\n台北校區：+886-2-2931-3416 ext 2206, 2207\n新竹校區：+886-2-2931-3416 ext 2206, 2207", "國際,兩岸,交流,外國學生,僑生,港澳生,海外研修,交換學生"],
    ["單一入口", "單一入口網站請至：\n<a href='https://iq.cute.edu.tw/index.do' target='_blank'>CUTe單一入口</a>\n\n提供以下服務：\n- 成績查詢\n- 學雜費繳費\n- 就學貸款申請\n- 學生證掛失\n- 密碼重設\n\n注意事項：\n1. 首次登入密碼預設為身份證字號\n2. 忘記密碼請使用備用信箱重設\n\n聯絡資訊：\n台北校區：(02)2931-3416\n新竹校區：(03)699-1111", "單一入口,成績,繳費,貸款,學生證,密碼,重設"],
    
    // 系所補充
    ["建築系", "建築系資訊請參考：\n<a href='https://arch.gm.cute.edu.tw/' target='_blank'>建築系網站</a>\n\n系所特色：\n- 建築設計\n- 建築技術\n- 建築歷史\n- 建築理論\n\n聯絡資訊：\n台北校區：(02)2931-3416#2403", "建築,建築設計,建築技術,建築歷史,建築理論"],
    ["土木與防災系", "土木與防災系資訊請參考：\n<a href='https://dcivil.gm.cute.edu.tw/' target='_blank'>土木與防災系網站</a>\n\n系所特色：\n- 土木工程\n- 防災工程\n- 結構工程\n- 大地工程\n\n聯絡資訊：\n台北校區：(02)2931-3416#2468", "土木,防災,結構工程,大地工程"],
    ["室內設計系", "室內設計系資訊請參考：\n<a href='https://dinte.gm.cute.edu.tw/' target='_blank'>室內設計系網站</a>\n\n系所特色：\n- 室內設計\n- 家具設計\n- 空間規劃\n- 色彩學\n\n聯絡資訊：\n台北校區：(02)2931-3416#2432\n新竹校區：(03)699-1111#1411", "室內,室設,家具設計,空間規劃,色彩學"],
    ["視覺傳達設計系", "視覺傳達設計系資訊請參考：\n<a href='https://web.cute.edu.tw/dvcd/' target='_blank'>視覺傳達設計系網站</a>\n\n系所特色：\n- 視覺設計\n- 平面設計\n- 包裝設計\n- 廣告設計\n\n聯絡資訊：\n台北校區：(02)2931-3416#2801\n新竹校區：(03)699-1111#1421", "視覺,視傳,平面設計,包裝設計,廣告設計"],
    ["影視設計系", "影視設計系資訊請參考：\n<a href='https://dfvp.cute.edu.tw/' target='_blank'>影視設計系網站</a>\n\n系所特色：\n- 影視製作\n- 影視剪輯\n- 影視特效\n- 影視攝影\n\n聯絡資訊：\n台北校區：(02)2931-3416#2283\n新竹校區：(03)699-1111#1441", "影視,影視製作,影視剪輯,影視特效,影視攝影"],
    ["數位多媒體設計系", "數位多媒體設計系資訊請參考：\n<a href='https://dmd.cute.edu.tw/' target='_blank'>數位多媒體設計系網站</a>\n\n系所特色：\n- 遊戲設計\n- 互動設計\n- 數位內容\n- 多媒體應用\n\n聯絡資訊：\n台北校區：(02)2931-3416#2831\n新竹校區：(03)699-1111#1431", "數媒,遊戲設計,互動設計"],
    ["企業管理系", "企業管理系資訊請參考：\n<a href='https://dba.gm.cute.edu.tw/' target='_blank'>企業管理系網站</a>\n\n系所特色：\n- 企業管理\n- 航空運輸服務管理\n- 企業管理雙學士學位\n\n聯絡資訊：\n台北校區：(02)2931-3416#2252\n新竹校區：(03)699-1111#1261", "企管"],
    ["智慧商務經營管理系", "智慧商務經營管理系資訊請參考：\n<a href='https://dib.gm.cute.edu.tw/' target='_blank'>智慧商務經營管理系網站</a>\n\n系所特色：\n- 智慧商務\n- 電子商務\n- 大數據分析\n- 數位行銷\n\n聯絡資訊：\n台北校區：(02)2931-3416#2222", "經管,智慧商務,電子商務"],
    ["財務金融系", "財務金融系資訊請參考：\n<a href='https://dfin.gm.cute.edu.tw/' target='_blank'>財務金融系網站</a>\n\n系所特色：\n- 財務管理\n- 投資理財\n- 金融市場\n- 風險管理\n\n聯絡資訊：\n台北校區：(02)2931-3416#2866", "財金,財務管理,投資理財"],
    ["行銷與流通管理系", "行銷與流通管理系資訊請參考：\n<a href='https://dml.gm.cute.edu.tw/' target='_blank'>行銷與流通管理系網站</a>\n\n系所特色：\n- 行銷管理\n- 物流管理\n- 供應鏈管理\n- 零售管理\n\n聯絡資訊：\n台北校區：(02)2931-3416#2550\n新竹校區：(03)699-1111#1271", "行銷,行管,流通,物流管理"],
    ["應用英語系", "應用英語系資訊請參考：\n<a href='https://deng.gm.cute.edu.tw/' target='_blank'>應用英語系網站</a>\n\n系所特色：\n- 英語教學\n- 商務英語\n- 翻譯\n- 跨文化溝通\n\n聯絡資訊：\n台北校區：(02)2931-3416#2386", "應英,英語教學,商務英語"],
    ["觀光與休閒事業管理系", "觀光與休閒事業管理系資訊請參考：\n<a href='https://dtlm.gm.cute.edu.tw/' target='_blank'>觀光與休閒事業管理系網站</a>\n\n系所特色：\n- 觀光管理\n- 休閒管理\n- 餐旅管理\n- 活動企劃\n\n聯絡資訊：\n台北校區：(02)2931-3416#2981\n新竹校區：(03)699-1111#1281", "觀管,觀光,休閒,餐旅管理"],
    ["資訊管理系", "資訊管理系資訊請參考：\n<a href='https://sites.google.com/view/cutedmis' target='_blank'>資訊管理系網站</a>\n\n系所特色：\n- 資訊系統\n- 資料庫管理\n- 電子商務\n- 企業資訊化\n\n聯絡資訊：\n台北校區：(02)2931-3416 #2352\n新竹校區：(03)699-1111#1360", "資管,資訊系統,資料庫"],
    ["資訊工程系", "資訊工程系資訊請參考：\n<a href='https://dcsie.gm.cute.edu.tw/' target='_blank'>資訊工程系網站</a>\n\n系所特色：\n- 軟體工程\n- 網路工程\n- 人工智慧\n- 物聯網\n\n聯絡資訊：\n台北校區：(02)2931-3416#2964\n新竹校區：(03)699-1111#1381", "資工,軟體工程,網路工程"],
    ["企管航空暨運輸服務管理組", "企管航空暨運輸服務管理組資訊請參考：\n<a href='https://atsm.gm.cute.edu.tw/' target='_blank'>航空暨運輸服務管理組網站</a>\n\n系所特色：\n- 航空服務管理\n- 運輸服務管理\n- 機場營運管理\n- 航空行銷\n\n聯絡資訊：\n台北校區：(02)2931-3416#2282", "航空運輸,企管航空,航空,運輸,機場,航空服務"],
    ["學士後多元培力學程數位音樂音效專班", "學士後多元培力學程數位音樂音效專班資訊請參考：\n<a href='https://sonic0933.wixsite.com/cutemusic/' target='_blank'>數位音樂音效專班網站</a>\n\n系所特色：\n- 數位音樂製作\n- 音效設計\n- 遊戲音效\n- 影視配樂\n\n聯絡資訊：\n台北校區：(02)2931-3416#1431", "數音,數位音樂,音效,配樂,音樂製作"],
    
    //補充
    ["獎學金","獎學金資訊請參考：\n<a href='https://sites.google.com/gm.cute.edu.tw/ecas/%E8%AA%B2%E5%A4%96%E7%B5%84%E7%8D%8E%E5%8A%A9%E5%AD%B8%E9%87%91%E5%B0%88%E5%8D%80?pli=1' target='_blank'>獎學金專區</a>\n\n提供以下獎學金：\n- 校內獎學金\n- 校外獎學金\n- 清寒獎學金\n- 優秀學生獎學金\n- 特殊表現獎學金\n\n申請注意事項：\n1. 請依各獎學金規定時間提出申請\n2. 備齊所需文件\n3. 符合申請資格\n4. 經系所審核後送交學務處","獎金,獎助學金,清寒獎學金,優秀獎學金"],
    


];

