import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import api from "../api/axios";
import "./GeneratedStory.css";
// ----------------------------------
// STORY DATA
// ----------------------------------

const princessStory = {
  English: [
    {
      title: "The Magical Kingdom",
      content: "Once upon a time, there was a beautiful kingdom surrounded by green hills, sparkling rivers and colourful gardens. A little hero named {name} lived in a lovely castle. Every day, {name} dreamed of magical adventures."
    },
    {
      title: "The Royal Celebration",
      content: "One sunny morning, the kingdom celebrated a grand festival. Music played, flowers decorated the castle and everyone smiled. The king and queen had a special surprise planned for {name}."
    },
    {
      title: "The Secret Letter",
      content: "While exploring the castle library, {name} discovered a tiny golden envelope hidden inside an old book. It had a shining star on it. The letter said, A magical adventure is waiting for a brave heart."
    },
    {
      title: "The Brave Prince",
      content: "{name} met a kind young prince near the castle garden. The prince had also received a mysterious letter. Together, they decided to discover the secret behind the golden message."
    },
    {
      title: "The Enchanted Garden",
      content: "They entered a beautiful garden filled with glowing flowers. A tiny butterfly flew around them and whispered, Follow the silver path. {name} smiled and followed the sparkling trail."
    },
    {
      title: "The Talking Rabbit",
      content: "Near a big tree, they met a little rabbit who could talk. The rabbit looked worried. It explained that the magical crown of the kingdom had disappeared. {name} promised to help."
    },
    {
      title: "The Map of Secrets",
      content: "The rabbit gave them an old map. It showed three special places: the Whispering Forest, the Crystal River and Dragon Mountain. The friends decided to visit each place."
    },
    {
      title: "The Whispering Forest",
      content: "The forest was full of tall trees and singing birds. Strange sounds came from behind the bushes. The prince felt nervous, but {name} encouraged everyone to stay together."
    },
    {
      title: "The Lost Fairy",
      content: "They found a little fairy sitting beside a flower. She had lost her magical wand. {name} helped search beneath the leaves and finally found it near a sparkling stone."
    },
    {
      title: "The Fairy's Gift",
      content: "The fairy was delighted and thanked {name}. She gave the friends a glowing crystal that could show hidden paths. Use it wisely, she said with a smile."
    },
    {
      title: "The Crystal River",
      content: "The friends reached a beautiful river with crystal-clear water. There was no bridge to cross it. {name} noticed shining stones near the riverbank and found a safe crossing."
    },
    {
      title: "The Friendly Dragon",
      content: "On the other side, they met a huge dragon. The dragon looked frightening, but it was actually very friendly. It explained that the royal crown was on Dragon Mountain."
    },
    {
      title: "The Mountain Climb",
      content: "The friends began climbing the mountain. The path was steep and full of slippery stones. They helped one another and never gave up, even when the journey became difficult."
    },
    {
      title: "The Hidden Cave",
      content: "At the top, they discovered a secret cave. Inside it were sparkling treasures and an old wooden chest. The golden crown was hidden inside the chest."
    },
    {
      title: "The Crown's Mystery",
      content: "When {name} touched the crown, a magical voice appeared. It said that the crown could only be returned by someone with a kind and honest heart."
    },
    {
      title: "The Final Challenge",
      content: "Suddenly, the cave began to shake. The friends had to choose between taking the treasure or helping a little bird trapped near the rocks. {name} immediately chose to save the bird."
    },
    {
      title: "The Power of Kindness",
      content: "As soon as {name} helped the bird, the cave became peaceful. The crown started glowing brightly. The magical voice praised {name} for choosing kindness instead of treasure."
    },
    {
      title: "The Journey Home",
      content: "The dragon safely carried the friends down the mountain. The rabbit and fairy joined them on the way back. Everyone was excited to return the crown to the kingdom."
    },
    {
      title: "The Kingdom Celebrates",
      content: "When they reached the castle, the king and queen welcomed them happily. The royal crown was placed back in its special place. Everyone cheered for {name} and the brave prince."
    },
    {
      title: "A Royal Surprise",
      content: "The king thanked {name} for showing courage, honesty and kindness. A beautiful celebration was arranged in the castle garden. The fairy made colourful lights dance in the sky."
    },
    {
      title: "A Promise of Friendship",
      content: "{name} and the prince promised to remain good friends and help anyone who needed them. The rabbit, fairy and dragon became their special friends too."
    },
    {
      title: "Happily Ever After",
      content: "That night, the kingdom slept peacefully under a sky full of stars. {name} learned that true bravery comes from a kind heart. The magical adventure ended with happiness, friendship and love."
    }
  ],

  Hindi: [
    {
      title: "जादुई राज्य",
      content: "एक समय की बात है, हरी पहाड़ियों और सुंदर बगीचों से घिरे एक राज्य में {name} नाम का प्यारा बच्चा रहता था। उसे नई जगहों की खोज करना बहुत पसंद था।"
    },
    {
      title: "शाही उत्सव",
      content: "एक सुबह पूरे राज्य में उत्सव मनाया जा रहा था। महल फूलों से सजाया गया था और हर तरफ संगीत बज रहा था। {name} के लिए एक खास सरप्राइज तैयार था।"
    },
    {
      title: "रहस्यमयी पत्र",
      content: "महल की लाइब्रेरी में {name} को एक सुनहरा लिफाफा मिला। उस पर एक चमकता हुआ सितारा बना था। पत्र में लिखा था कि एक जादुई रोमांच उसका इंतजार कर रहा है।"
    },
    {
      title: "बहादुर राजकुमार",
      content: "{name} की मुलाकात बगीचे में एक दयालु राजकुमार से हुई। राजकुमार को भी वैसा ही रहस्यमयी पत्र मिला था। दोनों ने मिलकर रहस्य सुलझाने का फैसला किया।"
    },
    {
      title: "जादुई बगीचा",
      content: "दोनों एक सुंदर बगीचे में पहुँचे। वहाँ रंग-बिरंगे फूल चमक रहे थे। एक छोटी तितली ने उन्हें चमकते रास्ते पर चलने को कहा।"
    },
    {
      title: "बात करने वाला खरगोश",
      content: "एक बड़े पेड़ के पास उन्हें एक छोटा खरगोश मिला। उसने बताया कि राज्य का जादुई मुकुट खो गया है। {name} ने उसकी मदद करने का वादा किया।"
    },
    {
      title: "रहस्यमयी नक्शा",
      content: "खरगोश ने उन्हें एक पुराना नक्शा दिया। उसमें तीन जगहें दिखाई गई थीं: फुसफुसाता जंगल, चमकती नदी और ड्रैगन पहाड़।"
    },
    {
      title: "जंगल की यात्रा",
      content: "जंगल में ऊँचे पेड़ और सुंदर पक्षी थे। झाड़ियों के पीछे से अजीब आवाजें आ रही थीं। {name} ने सबको साथ रहने के लिए कहा।"
    },
    {
      title: "खोई हुई परी",
      content: "उन्हें एक फूल के पास बैठी छोटी परी मिली। उसकी जादुई छड़ी खो गई थी। {name} ने पत्तों के नीचे खोजकर उसकी छड़ी ढूँढने में मदद की।"
    },
    {
      title: "परी का उपहार",
      content: "परी बहुत खुश हुई। उसने {name} को एक चमकता हुआ जादुई क्रिस्टल दिया। उसने कहा कि यह छिपे हुए रास्ते दिखा सकता है।"
    },
    {
      title: "चमकती नदी",
      content: "सभी एक सुंदर नदी के पास पहुँचे। वहाँ कोई पुल नहीं था। {name} ने किनारे पर चमकते पत्थर देखे और सुरक्षित रास्ता खोज लिया।"
    },
    {
      title: "मिलनसार ड्रैगन",
      content: "नदी के दूसरी तरफ एक बड़ा ड्रैगन मिला। वह डरावना दिखता था, लेकिन बहुत दयालु था। उसने बताया कि मुकुट पहाड़ की चोटी पर है।"
    },
    {
      title: "पहाड़ की चढ़ाई",
      content: "सभी पहाड़ पर चढ़ने लगे। रास्ता कठिन और फिसलन भरा था। उन्होंने एक-दूसरे की मदद की और हिम्मत नहीं हारी।"
    },
    {
      title: "छिपी हुई गुफा",
      content: "पहाड़ की चोटी पर एक गुफा मिली। अंदर बहुत सारे खजाने थे। एक पुराने संदूक में सुनहरा शाही मुकुट रखा था।"
    },
    {
      title: "मुकुट का रहस्य",
      content: "जैसे ही {name} ने मुकुट को छुआ, एक जादुई आवाज आई। उसने कहा कि मुकुट वही वापस ले जा सकता है जिसका दिल दयालु और सच्चा हो।"
    },
    {
      title: "आखिरी परीक्षा",
      content: "अचानक गुफा हिलने लगी। दोस्तों के सामने खजाना लेने या पत्थरों में फँसे पक्षी को बचाने का विकल्प था। {name} ने पक्षी को बचाने का फैसला किया।"
    },
    {
      title: "दयालुता की शक्ति",
      content: "{name} ने पक्षी की मदद की और गुफा शांत हो गई। मुकुट तेज रोशनी से चमकने लगा। जादुई आवाज ने {name} की दयालुता की प्रशंसा की।"
    },
    {
      title: "घर वापसी",
      content: "ड्रैगन ने सभी को सुरक्षित पहाड़ से नीचे पहुँचाया। खरगोश और परी भी उनके साथ लौटे। सभी मुकुट को राज्य में वापस ले जाने के लिए खुश थे।"
    },
    {
      title: "राज्य का उत्सव",
      content: "महल पहुँचने पर राजा और रानी ने सभी का स्वागत किया। मुकुट फिर से अपने स्थान पर रखा गया। पूरे राज्य ने {name} और राजकुमार की जय-जयकार की।"
    },
    {
      title: "शाही सरप्राइज",
      content: "राजा ने {name} को बहादुरी और दयालुता के लिए धन्यवाद दिया। महल के बगीचे में सुंदर उत्सव हुआ। परी ने आसमान में रंग-बिरंगी रोशनी बिखेरी।"
    },
    {
      title: "दोस्ती का वादा",
      content: "{name} और राजकुमार ने हमेशा अच्छे दोस्त बने रहने का वादा किया। खरगोश, परी और ड्रैगन भी उनके खास दोस्त बन गए।"
    },
    {
      title: "सुखद अंत",
      content: "उस रात पूरा राज्य तारों भरे आसमान के नीचे शांति से सो गया। {name} ने सीखा कि सच्ची बहादुरी दयालु दिल में होती है।"
    }
  ],

  Marathi: [
    {
      title: "जादुई राज्य",
      content: "एके काळी हिरव्यागार डोंगरांनी आणि सुंदर बागांनी वेढलेल्या राज्यात {name} नावाचे एक गोड मूल राहत होते. त्याला नवीन ठिकाणे शोधायला खूप आवडायचे."
    },
    {
      title: "राजेशाही उत्सव",
      content: "एका सुंदर सकाळी संपूर्ण राज्यात उत्सव सुरू होता. राजवाडा फुलांनी सजवला होता आणि सगळीकडे संगीत वाजत होते. {name} साठी एक खास सरप्राइज तयार होते."
    },
    {
      title: "रहस्यमय पत्र",
      content: "राजवाड्यातील जुन्या पुस्तकांच्या खोलीत {name} ला एक सोनेरी पाकीट सापडले. त्यावर चमकणारा तारा होता. पत्रात लिहिले होते की एक जादुई साहस {name} ची वाट पाहत आहे."
    },
    {
      title: "धाडसी राजकुमार",
      content: "बागेत {name} ची भेट एका प्रेमळ राजकुमाराशी झाली. त्यालाही असेच रहस्यमय पत्र मिळाले होते. दोघांनी मिळून या गूढ गोष्टीचा शोध घेण्याचे ठरवले."
    },
    {
      title: "जादुई बाग",
      content: "दोघे एका सुंदर बागेत पोहोचले. तिथे रंगीबेरंगी फुले चमकत होती. एका छोट्या फुलपाखराने त्यांना चमकणाऱ्या वाटेने जाण्यास सांगितले."
    },
    {
      title: "बोलणारा ससा",
      content: "एका मोठ्या झाडाजवळ त्यांना एक छोटासा ससा भेटला. त्याने सांगितले की राज्याचा जादुई मुकुट हरवला आहे. {name} ने त्याला मदत करण्याचे वचन दिले."
    },
    {
      title: "रहस्यमय नकाशा",
      content: "सशाने त्यांना एक जुना नकाशा दिला. त्यात तीन ठिकाणे दाखवली होती: कुजबुजणारे जंगल, चमकणारी नदी आणि ड्रॅगनचा डोंगर."
    },
    {
      title: "जंगलातील प्रवास",
      content: "जंगलात उंच झाडे आणि सुंदर पक्षी होते. झुडपांमधून विचित्र आवाज येत होते. {name} ने सगळ्यांना एकत्र राहण्यास सांगितले."
    },
    {
      title: "हरवलेली परी",
      content: "त्यांना एका फुलाजवळ बसलेली छोटी परी दिसली. तिची जादूची कांडी हरवली होती. {name} ने पानांखाली शोधून तिची कांडी शोधण्यात मदत केली."
    },
    {
      title: "परीचे बक्षीस",
      content: "परी खूप आनंदी झाली. तिने {name} ला एक चमकणारा जादुई खडा दिला. हा खडा लपलेल्या वाटा दाखवू शकतो, असे तिने सांगितले."
    },
    {
      title: "चमकणारी नदी",
      content: "सगळे एका सुंदर नदीजवळ पोहोचले. तिथे पूल नव्हता. {name} ने नदीकाठी चमकणारे दगड पाहिले आणि सुरक्षितपणे नदी ओलांडण्याची वाट शोधली."
    },
    {
      title: "मैत्रीपूर्ण ड्रॅगन",
      content: "नदीच्या पलीकडे एक मोठा ड्रॅगन भेटला. तो दिसायला भयानक होता, पण मनाने खूप चांगला होता. त्याने सांगितले की मुकुट डोंगरावर लपवला आहे."
    },
    {
      title: "डोंगराची चढाई",
      content: "सगळे डोंगर चढू लागले. वाट कठीण आणि घसरडी होती. त्यांनी एकमेकांना मदत केली आणि हार मानली नाही."
    },
    {
      title: "गुप्त गुहा",
      content: "डोंगराच्या माथ्यावर त्यांना एक गुप्त गुहा सापडली. आत खूप खजिना होता. एका जुन्या पेटीत सोनेरी राजमुकुट ठेवलेला होता."
    },
    {
      title: "मुकुटाचे रहस्य",
      content: "{name} ने मुकुटाला स्पर्श करताच एक जादुई आवाज ऐकू आला. मुकुट फक्त अशाच व्यक्तीला परत नेता येईल जिचे मन प्रेमळ आणि प्रामाणिक आहे."
    },
    {
      title: "शेवटची परीक्षा",
      content: "अचानक गुहा हलू लागली. मित्रांसमोर खजिना घेण्याचा किंवा दगडांमध्ये अडकलेल्या छोट्या पक्ष्याला वाचवण्याचा पर्याय होता. {name} ने पक्ष्याला वाचवण्याचे ठरवले."
    },
    {
      title: "दयाळूपणाची ताकद",
      content: "{name} ने पक्ष्याला मदत केली आणि गुहा शांत झाली. मुकुट तेजाने चमकू लागला. जादुई आवाजाने {name} च्या दयाळूपणाचे कौतुक केले."
    },
    {
      title: "घरी परतण्याचा प्रवास",
      content: "ड्रॅगनने सर्वांना सुरक्षितपणे डोंगरावरून खाली आणले. ससा आणि परीसुद्धा त्यांच्यासोबत परत आले. सगळे आनंदी होते."
    },
    {
      title: "राज्यात आनंदोत्सव",
      content: "राजवाड्यात पोहोचल्यावर राजा आणि राणीने सर्वांचे स्वागत केले. मुकुट पुन्हा त्याच्या जागी ठेवण्यात आला. संपूर्ण राज्याने {name} आणि राजकुमाराचे कौतुक केले."
    },
    {
      title: "राजेशाही सरप्राइज",
      content: "राजाने {name} चे धाडस आणि दयाळूपणाबद्दल आभार मानले. राजवाड्याच्या बागेत सुंदर उत्सव साजरा झाला. परीने आकाशात रंगीबेरंगी प्रकाश पसरवला."
    },
    {
      title: "मैत्रीचे वचन",
      content: "{name} आणि राजकुमाराने कायम चांगले मित्र राहण्याचे वचन दिले. ससा, परी आणि ड्रॅगनसुद्धा त्यांचे खास मित्र बनले."
    },
    {
      title: "आनंदी शेवट",
      content: "त्या रात्री संपूर्ण राज्य ताऱ्यांनी भरलेल्या आकाशाखाली शांत झोपले. {name} ला समजले की खरे धाडस प्रेमळ मनात असते."
    }
  ]
};

// ----------------------------------
// OTHER CATEGORY STORY DATA
// ----------------------------------

const otherStories = {
  "Jungle Adventure": {
    English: [
      ["The Jungle Explorer", "One morning, {name} entered a beautiful green jungle. Tall trees, colourful flowers and birds filled the forest. A wonderful adventure was about to begin."],
      ["The Talking Parrot", "A colourful parrot flew down and greeted {name}. It explained that a little elephant had lost its way."],
      ["The Lost Baby Elephant", "{name} found tiny footprints near a river. Following them carefully, {name} discovered a baby elephant waiting for its family."],
      ["The River Adventure", "The friends reached a wide river. They searched for a safe crossing and helped one another reach the other side."],
      ["The Mysterious Footprints", "Strange footprints appeared on the soft ground. The parrot recognised them and guided everyone through the forest."],
      ["The Dark Jungle Cave", "They discovered a cave behind thick bushes. Inside, they found a family of little animals who needed help."],
      ["The Friendly Lion", "A friendly lion appeared and offered to guide them. He knew a safe path through the jungle."],
      ["The Secret Waterfall", "Behind the trees, they discovered a beautiful waterfall. The baby elephant recognised the place and became excited."],
      ["The Jungle in Danger", "A fallen tree blocked the animals' path home. {name} thought of a clever way to clear the path safely."],
      ["The Great Rescue", "With help from the lion, parrot and other animals, the path was cleared. The baby elephant finally found its family."],
      ["The Hero of the Jungle", "All the animals thanked {name}. The adventure taught everyone that teamwork and kindness can solve big problems."]
    ],
    Hindi: [
      ["जंगल का खोजी", "एक सुबह {name} एक सुंदर हरे जंगल में पहुँचा। ऊँचे पेड़, रंगीन फूल और पक्षी वहाँ थे। एक रोमांचक यात्रा शुरू होने वाली थी।"],
      ["बात करने वाला तोता", "एक रंगीन तोता नीचे आया और {name} से मिला। उसने बताया कि एक छोटा हाथी अपने परिवार से बिछड़ गया है।"],
      ["खोया हुआ हाथी", "{name} को नदी के पास छोटे पैरों के निशान मिले। उनका पीछा करते हुए उसे एक छोटा हाथी मिला।"],
      ["नदी का रोमांच", "दोस्त एक चौड़ी नदी के पास पहुँचे। उन्होंने सुरक्षित रास्ता खोजा और मिलकर नदी पार की।"],
      ["रहस्यमयी निशान", "जमीन पर अजीब निशान दिखाई दिए। तोते ने उन्हें पहचान लिया और सभी को जंगल के अंदर ले गया।"],
      ["अंधेरी गुफा", "उन्हें झाड़ियों के पीछे एक गुफा मिली। अंदर कुछ छोटे जानवर मदद का इंतजार कर रहे थे।"],
      ["मिलनसार शेर", "एक दयालु शेर आया और उसने उन्हें सुरक्षित रास्ता दिखाने का वादा किया।"],
      ["गुप्त झरना", "पेड़ों के पीछे एक सुंदर झरना था। छोटे हाथी ने उस जगह को पहचान लिया।"],
      ["जंगल पर संकट", "एक बड़ा पेड़ जानवरों के घर जाने का रास्ता रोक रहा था। {name} ने रास्ता साफ करने का उपाय सोचा।"],
      ["बड़ा बचाव", "शेर, तोते और दूसरे जानवरों ने मिलकर रास्ता साफ किया। छोटा हाथी अपने परिवार से मिल गया।"],
      ["जंगल का नायक", "सभी जानवरों ने {name} को धन्यवाद दिया। सभी ने सीखा कि मिलकर काम करने से बड़ी मुश्किलें हल होती हैं।"]
    ],
    Marathi: [
      ["जंगलातील शोधक", "एका सकाळी {name} एका सुंदर हिरव्यागार जंगलात पोहोचले. उंच झाडे, रंगीबेरंगी फुले आणि पक्षी तिथे होते. एक सुंदर साहस सुरू होणार होते."],
      ["बोलणारा पोपट", "एक रंगीबेरंगी पोपट खाली आला आणि {name} ला भेटला. त्याने सांगितले की एक छोटा हत्ती आपल्या कुटुंबापासून हरवला आहे."],
      ["हरवलेला हत्ती", "{name} ला नदीजवळ छोट्या पावलांचे ठसे दिसले. त्यांचा मागोवा घेतल्यावर एक छोटा हत्ती सापडला."],
      ["नदीतील साहस", "मित्र एका मोठ्या नदीजवळ पोहोचले. त्यांनी सुरक्षित वाट शोधली आणि एकमेकांच्या मदतीने नदी पार केली."],
      ["रहस्यमय ठसे", "जमिनीवर विचित्र ठसे दिसले. पोपटाने ते ओळखले आणि सर्वांना जंगलातून पुढे नेले."],
      ["अंधारी गुहा", "झुडपांच्या मागे त्यांना एक गुहा सापडली. आत काही छोटे प्राणी मदतीची वाट पाहत होते."],
      ["मैत्रीपूर्ण सिंह", "एक प्रेमळ सिंह आला आणि त्याने सुरक्षित वाट दाखवण्याचे वचन दिले."],
      ["गुप्त धबधबा", "झाडांच्या मागे एक सुंदर धबधबा होता. छोट्या हत्तीने ती जागा ओळखली."],
      ["जंगलावर संकट", "एक मोठे झाड प्राण्यांच्या घराकडे जाणारी वाट अडवत होते. {name} ने ती वाट मोकळी करण्याचा उपाय शोधला."],
      ["मोठी सुटका", "सिंह, पोपट आणि इतर प्राण्यांनी मिळून वाट मोकळी केली. छोटा हत्ती आपल्या कुटुंबाला भेटला."],
      ["जंगलाचा हिरो", "सर्व प्राण्यांनी {name} चे आभार मानले. एकत्र काम केल्याने मोठ्या अडचणी सोडवता येतात हे सर्वांना समजले."]
    ]
  },

  "Space Adventure": {
    English: [
      ["A Dream About Space", "{name} loved looking at the stars. Every night, {name} dreamed of visiting the moon and exploring distant planets."],
      ["The Magical Spaceship", "One evening, a little spaceship landed near the garden. Its friendly computer invited {name} aboard."],
      ["Journey to the Stars", "The spaceship travelled through sparkling stars. {name} looked through the window and saw beautiful planets."],
      ["The Friendly Alien", "A friendly little alien welcomed {name} to a colourful planet. They quickly became friends."],
      ["The Lost Space Crystal", "The alien explained that the planet's special crystal was missing. Without it, the planet would lose its light."],
      ["Exploring the Moon", "{name} and the alien travelled to the moon. They searched carefully among the rocks and craters."],
      ["The Planet of Colours", "They discovered a planet filled with colourful mountains and glowing flowers. A trail of tiny lights showed the way."],
      ["The Space Storm", "A gentle spaceship storm appeared. The friends stayed calm and followed the computer's safety instructions."],
      ["Saving the Alien Planet", "They found the missing crystal inside a small cave and returned it to its special place."],
      ["The Journey Back Home", "The planet became bright again. The alien thanked {name} and guided the spaceship back to Earth."],
      ["The Little Space Hero", "{name} returned home with wonderful memories. The adventure taught that curiosity, courage and friendship are powerful."]
    ],
    Hindi: [
      ["अंतरिक्ष का सपना", "{name} को तारे देखना बहुत पसंद था। हर रात वह चाँद और दूर के ग्रहों की यात्रा का सपना देखता था।"],
      ["जादुई अंतरिक्ष यान", "एक शाम बगीचे के पास एक छोटा अंतरिक्ष यान उतरा। उसके दोस्ताना कंप्यूटर ने {name} को अंदर बुलाया।"],
      ["तारों की यात्रा", "अंतरिक्ष यान चमकते तारों के बीच से गुजरा। {name} ने खिड़की से सुंदर ग्रह देखे।"],
      ["मिलनसार एलियन", "एक रंगीन ग्रह पर एक प्यारे एलियन ने {name} का स्वागत किया। दोनों जल्दी ही दोस्त बन गए।"],
      ["खोया हुआ क्रिस्टल", "एलियन ने बताया कि ग्रह का खास क्रिस्टल खो गया है। उसके बिना ग्रह की रोशनी चली जाएगी।"],
      ["चाँद की खोज", "{name} और एलियन चाँद पर पहुँचे। उन्होंने चट्टानों और गड्ढों के बीच खोज शुरू की।"],
      ["रंगों का ग्रह", "उन्हें रंगीन पहाड़ियों और चमकते फूलों वाला ग्रह मिला। छोटी रोशनियाँ रास्ता दिखा रही थीं।"],
      ["अंतरिक्ष का तूफान", "अंतरिक्ष में हल्का तूफान आया। दोनों शांत रहे और कंप्यूटर के निर्देशों का पालन किया।"],
      ["ग्रह की रक्षा", "उन्हें खोया हुआ क्रिस्टल एक छोटी गुफा में मिला। उन्होंने उसे वापस उसकी जगह पर रख दिया।"],
      ["घर वापसी", "ग्रह फिर से चमकने लगा। एलियन ने {name} को धन्यवाद दिया और यान पृथ्वी पर लौट आया।"],
      ["छोटा अंतरिक्ष नायक", "{name} सुंदर यादों के साथ घर लौटा। उसने सीखा कि जिज्ञासा, साहस और दोस्ती बहुत खास हैं।"]
    ],
    Marathi: [
      ["अंतराळाचे स्वप्न", "{name} ला तारे पाहायला खूप आवडायचे. रोज रात्री {name} चंद्रावर आणि दूरच्या ग्रहांवर जाण्याचे स्वप्न पाहायचे."],
      ["जादुई अंतराळयान", "एका संध्याकाळी बागेजवळ एक छोटे अंतराळयान उतरले. त्यातील मैत्रीपूर्ण संगणकाने {name} ला आत बोलावले."],
      ["ताऱ्यांचा प्रवास", "अंतराळयान चमकणाऱ्या ताऱ्यांमधून पुढे गेले. {name} ने खिडकीतून सुंदर ग्रह पाहिले."],
      ["मैत्रीपूर्ण एलियन", "एका रंगीबेरंगी ग्रहावर एका गोड एलियनने {name} चे स्वागत केले. दोघांची लगेच मैत्री झाली."],
      ["हरवलेला खडा", "एलियनने सांगितले की ग्रहाचा खास खडा हरवला आहे. त्याच्याशिवाय ग्रहाचा प्रकाश नाहीसा होईल."],
      ["चंद्राची सफर", "{name} आणि एलियन चंद्रावर गेले. त्यांनी खडकांमध्ये आणि खड्ड्यांमध्ये शोध सुरू केला."],
      ["रंगांचा ग्रह", "त्यांना रंगीबेरंगी डोंगर आणि चमकणारी फुले असलेला ग्रह सापडला. छोटे दिवे त्यांना वाट दाखवत होते."],
      ["अंतराळातील वादळ", "अंतराळात एक छोटे वादळ आले. दोघांनी शांत राहून संगणकाच्या सूचना पाळल्या."],
      ["ग्रहाची सुटका", "त्यांना हरवलेला खडा एका छोट्या गुहेत सापडला. त्यांनी तो पुन्हा योग्य जागी ठेवला."],
      ["घरी परतण्याचा प्रवास", "ग्रह पुन्हा चमकू लागला. एलियनने {name} चे आभार मानले आणि अंतराळयान पृथ्वीवर परतले."],
      ["छोटा अंतराळवीर हिरो", "{name} सुंदर आठवणी घेऊन घरी परतले. जिज्ञासा, धैर्य आणि मैत्री खूप महत्त्वाची असते हे त्यांना समजले."]
    ]
  },

  "Magic & Fairy Tales": {
    English: [
      ["The Enchanted Village", "{name} lived near a beautiful village where flowers glowed at night and tiny stars appeared above the trees."],
      ["A Tiny Fairy Appears", "One morning, a tiny fairy appeared near the garden and asked {name} for help."],
      ["The Magical Wand", "The fairy had lost her magical wand. {name} searched the garden and found it beside a little fountain."],
      ["The Secret Fairy Garden", "The fairy showed {name} a hidden garden filled with colourful flowers and singing butterflies."],
      ["The Disappearing Colours", "Suddenly, the village flowers began losing their colours. The fairy explained that the magic was fading."],
      ["The Wizard's Challenge", "A friendly wizard gave {name} a small puzzle. Solving it would help bring the colours back."],
      ["The Rainbow Bridge", "{name} solved the puzzle and a beautiful rainbow bridge appeared across the sky."],
      ["The Lost Fairy Dust", "The friends discovered that the fairy dust had been scattered by the wind. They searched for every sparkling piece."],
      ["The Power of Friendship", "With help from the village animals, they collected the fairy dust and filled the magical jar."],
      ["Bringing Magic Back", "The fairy sprinkled the dust over the flowers. The whole village became bright and colourful again."],
      ["The Fairy's Special Gift", "The fairy thanked {name} and gave a special flower as a reminder that kindness makes magic stronger."]
    ],
    Hindi: [
      ["जादुई गाँव", "{name} एक सुंदर गाँव के पास रहता था। वहाँ रात में फूल चमकते थे और पेड़ों के ऊपर छोटे सितारे दिखाई देते थे।"],
      ["छोटी परी", "एक सुबह बगीचे में एक छोटी परी आई और उसने {name} से मदद माँगी।"],
      ["जादुई छड़ी", "परी की जादुई छड़ी खो गई थी। {name} ने बगीचे में खोजकर उसे फव्वारे के पास पाया।"],
      ["गुप्त परी बगीचा", "परी ने {name} को एक छिपा हुआ बगीचा दिखाया। वहाँ रंगीन फूल और गाते हुए तितलियाँ थीं।"],
      ["गायब होते रंग", "अचानक गाँव के फूलों के रंग फीके पड़ने लगे। परी ने बताया कि जादू कम हो रहा है।"],
      ["जादूगर की चुनौती", "एक दयालु जादूगर ने {name} को एक छोटी पहेली दी। उसे हल करने से रंग वापस आ सकते थे।"],
      ["इंद्रधनुष का पुल", "{name} ने पहेली हल की और आसमान में सुंदर इंद्रधनुष का पुल दिखाई दिया।"],
      ["खोई हुई परी धूल", "दोस्तों को पता चला कि परी की जादुई धूल हवा में बिखर गई थी। उन्होंने हर चमकता कण खोजा।"],
      ["दोस्ती की ताकत", "गाँव के जानवरों की मदद से उन्होंने सारी जादुई धूल इकट्ठी की।"],
      ["जादू की वापसी", "परी ने फूलों पर जादुई धूल छिड़की। पूरा गाँव फिर से रंगीन हो गया।"],
      ["परी का उपहार", "परी ने {name} को एक खास फूल दिया और कहा कि दयालुता से जादू और मजबूत होता है।"]
    ],
    Marathi: [
      ["जादुई गाव", "{name} एका सुंदर गावाजवळ राहत होते. तिथे रात्री फुले चमकत आणि झाडांवर छोटे तारे दिसत."],
      ["छोटी परी", "एका सकाळी बागेत एक छोटी परी आली आणि तिने {name} कडे मदत मागितली."],
      ["जादूची कांडी", "परीची जादूची कांडी हरवली होती. {name} ने बागेत शोधून ती एका कारंज्याजवळ शोधली."],
      ["गुप्त परीबाग", "परीने {name} ला एक गुप्त बाग दाखवली. तिथे रंगीबेरंगी फुले आणि गाणारी फुलपाखरे होती."],
      ["गायब होणारे रंग", "अचानक गावातील फुलांचे रंग फिके होऊ लागले. जादू कमी होत असल्याचे परीने सांगितले."],
      ["जादूगाराची परीक्षा", "एका प्रेमळ जादूगाराने {name} ला एक छोटी कोडी दिली. ती सोडवल्यास रंग परत येणार होते."],
      ["इंद्रधनुष्याचा पूल", "{name} ने कोडे सोडवले आणि आकाशात सुंदर इंद्रधनुष्याचा पूल दिसू लागला."],
      ["हरवलेली परीधूळ", "परीची जादुई धूळ वाऱ्यामुळे सगळीकडे पसरली होती. मित्रांनी प्रत्येक चमकणारा कण शोधला."],
      ["मैत्रीची ताकद", "गावातील प्राण्यांच्या मदतीने त्यांनी परीधूळ गोळा केली."],
      ["जादूची परतफेड", "परीने फुलांवर जादूची धूळ पसरवली. संपूर्ण गाव पुन्हा रंगीबेरंगी झाले."],
      ["परीचे खास बक्षीस", "परीने {name} ला एक खास फूल दिले. दयाळूपणामुळे जादू अधिक सुंदर होते, हे तिने सांगितले."]
    ]
  },

  "Dinosaur World": {
    English: [
      ["The Mysterious Egg", "{name} discovered a large colourful egg near a rocky hill. It was warm and made a tiny sound."],
      ["A Baby Dinosaur Hatches", "The egg cracked open and a tiny baby dinosaur appeared. It looked at {name} with curious eyes."],
      ["Welcome to Dinosaur Land", "The baby dinosaur led {name} to a hidden valley where many friendly dinosaurs lived."],
      ["Meeting the Giant Dinosaurs", "{name} met tall long-necked dinosaurs and playful little dinosaurs. Everyone welcomed the new visitor."],
      ["The Lost Dinosaur Friend", "One small dinosaur had lost its way. {name} promised to help it find its family."],
      ["Crossing the Volcano Valley", "The friends carefully crossed a quiet valley near an old volcano. They followed a safe path."],
      ["The Dinosaur Cave", "Inside a cave, they found footprints and a map that showed the way home."],
      ["The Big Storm", "Dark clouds appeared and rain began to fall. The dinosaurs found shelter beneath a rocky cliff."],
      ["Saving the Dinosaur Family", "{name} helped the little dinosaur guide its family to a safe place."],
      ["The Secret Dinosaur Garden", "After the storm, they discovered a hidden garden full of beautiful plants and fresh water."],
      ["A New Dinosaur Friend", "The dinosaurs thanked {name}. The little dinosaur became a special friend and promised to meet again."]
    ],
    Hindi: [
      ["रहस्यमयी अंडा", "{name} को एक पहाड़ी के पास बड़ा रंगीन अंडा मिला। वह गर्म था और उसमें से छोटी आवाज आ रही थी।"],
      ["छोटा डायनासोर", "अंडा खुला और उसमें से एक छोटा डायनासोर निकला। उसने उत्सुकता से {name} को देखा।"],
      ["डायनासोर की दुनिया", "छोटा डायनासोर {name} को एक छिपी घाटी में ले गया जहाँ कई प्यारे डायनासोर रहते थे।"],
      ["विशाल डायनासोर", "{name} ने लंबे गले वाले और छोटे खेलते हुए डायनासोर देखे। सभी ने उसका स्वागत किया।"],
      ["खोया हुआ दोस्त", "एक छोटा डायनासोर रास्ता भूल गया था। {name} ने उसे परिवार तक पहुँचाने का वादा किया।"],
      ["ज्वालामुखी घाटी", "दोस्तों ने पुराने ज्वालामुखी के पास एक शांत घाटी पार की। उन्होंने सुरक्षित रास्ता चुना।"],
      ["डायनासोर की गुफा", "गुफा में उन्हें पैरों के निशान और घर जाने का नक्शा मिला।"],
      ["बड़ा तूफान", "आसमान में काले बादल आए और बारिश होने लगी। सभी डायनासोर चट्टान के नीचे छिप गए।"],
      ["परिवार की मदद", "{name} ने छोटे डायनासोर को उसके परिवार तक पहुँचाने में मदद की।"],
      ["गुप्त बगीचा", "तूफान के बाद उन्हें सुंदर पौधों और साफ पानी से भरा एक बगीचा मिला।"],
      ["नया दोस्त", "डायनासोर ने {name} को धन्यवाद दिया। छोटा डायनासोर उसका खास दोस्त बन गया।"]
    ],
    Marathi: [
      ["रहस्यमय अंडे", "{name} ला एका डोंगराजवळ मोठे रंगीत अंडे सापडले. ते गरम होते आणि त्यातून छोटासा आवाज येत होता."],
      ["छोटा डायनासोर", "अंडे फुटले आणि त्यातून एक छोटा डायनासोर बाहेर आला. त्याने {name} कडे कुतूहलाने पाहिले."],
      ["डायनासोरचे जग", "छोटा डायनासोर {name} ला एका गुप्त दरीत घेऊन गेला. तिथे अनेक प्रेमळ डायनासोर राहत होते."],
      ["विशाल डायनासोर", "{name} ला लांब मानेचे आणि छोटे खेळकर डायनासोर भेटले. सर्वांनी त्याचे स्वागत केले."],
      ["हरवलेला मित्र", "एक छोटा डायनासोर रस्ता चुकला होता. {name} ने त्याला कुटुंबापर्यंत पोहोचवण्याचे ठरवले."],
      ["ज्वालामुखीची दरी", "मित्रांनी जुन्या ज्वालामुखीजवळची शांत दरी काळजीपूर्वक पार केली."],
      ["डायनासोरची गुहा", "गुहेत त्यांना पावलांचे ठसे आणि घरी जाण्याचा नकाशा सापडला."],
      ["मोठे वादळ", "आकाशात काळे ढग आले आणि पाऊस सुरू झाला. सर्व डायनासोर एका मोठ्या खडकाखाली थांबले."],
      ["कुटुंबाची सुटका", "{name} ने छोट्या डायनासोरला त्याच्या कुटुंबापर्यंत पोहोचवण्यास मदत केली."],
      ["गुप्त बाग", "वादळानंतर त्यांना सुंदर झाडे आणि स्वच्छ पाणी असलेली गुप्त बाग सापडली."],
      ["नवीन डायनासोर मित्र", "डायनासोरने {name} चे आभार मानले. छोटा डायनासोर त्याचा खास मित्र बनला."]
    ]
  },

  "Bedtime Stories": {
    English: [
      ["A Sleepy Little Child", "One peaceful evening, {name} felt sleepy after a happy day. The stars began appearing in the night sky."],
      ["The Talking Moon", "A friendly moon smiled through the window and invited {name} on a gentle dream journey."],
      ["A Journey Through the Clouds", "{name} floated softly through fluffy clouds. Everything was quiet, peaceful and beautiful."],
      ["Meeting the Little Star", "A tiny star had lost its sparkle. {name} stopped to help the little star feel happy again."],
      ["The Dreamy Cloud Castle", "They reached a soft cloud castle where friendly stars welcomed them."],
      ["The Missing Starlight", "The castle lights were fading. The moon explained that a golden star was missing."],
      ["The Sleepy Star Kingdom", "{name} explored the peaceful star kingdom and asked the little stars where the golden star could be."],
      ["Finding the Golden Star", "A little star showed them the golden star resting behind a silver cloud."],
      ["Bringing Back the Moonlight", "The golden star returned to its place and the whole sky became bright again."],
      ["A Beautiful Dream", "The moon thanked {name} and gave a gentle glow to light the way home."],
      ["Sweet Dreams and Good Night", "{name} returned to bed feeling safe and happy. The moon smiled and whispered, Good night and sweet dreams."]
    ],
    Hindi: [
      ["नींद भरा बच्चा", "एक शांत शाम {name} पूरे दिन खेलने के बाद थक गया था। आसमान में तारे चमकने लगे।"],
      ["बात करने वाला चाँद", "खिड़की से एक प्यारा चाँद मुस्कुराया और {name} को सपनों की यात्रा पर बुलाया।"],
      ["बादलों की यात्रा", "{name} मुलायम बादलों के बीच धीरे-धीरे उड़ने लगा। सब कुछ शांत और सुंदर था।"],
      ["छोटा तारा", "एक छोटे तारे की चमक खो गई थी। {name} ने उसकी मदद करने का फैसला किया।"],
      ["बादलों का महल", "वे बादलों के एक सुंदर महल में पहुँचे। वहाँ छोटे सितारों ने उनका स्वागत किया।"],
      ["गायब रोशनी", "महल की रोशनी कम हो रही थी। चाँद ने बताया कि एक सुनहरा तारा खो गया है।"],
      ["सितारों का राज्य", "{name} ने शांत सितारों के राज्य में सुनहरे तारे को खोजने में मदद की।"],
      ["सुनहरे तारे की खोज", "एक छोटे तारे ने उन्हें चाँदी जैसे बादल के पीछे सुनहरा तारा दिखाया।"],
      ["चाँदनी की वापसी", "सुनहरा तारा अपनी जगह लौट आया और पूरा आसमान फिर से चमकने लगा।"],
      ["सुंदर सपना", "चाँद ने {name} को धन्यवाद दिया और घर जाने के लिए प्यारी रोशनी दी।"],
      ["शुभ रात्रि", "{name} खुशी से अपने बिस्तर पर लौट आया। चाँद ने मुस्कुराकर कहा, शुभ रात्रि और मीठे सपने।"]
    ],
    Marathi: [
      ["झोपाळू बाळ", "एका शांत संध्याकाळी {name} दिवसभर खेळून थकले होते. आकाशात तारे चमकू लागले."],
      ["बोलणारा चंद्र", "खिडकीतून एक प्रेमळ चंद्र हसला आणि त्याने {name} ला स्वप्नांच्या प्रवासासाठी बोलावले."],
      ["ढगांमधील प्रवास", "{name} मऊ ढगांमधून हळूहळू तरंगू लागले. सगळीकडे शांतता आणि सुंदरता होती."],
      ["छोटासा तारा", "एका छोट्या ताऱ्याचा प्रकाश हरवला होता. {name} ने त्याला मदत करण्याचे ठरवले."],
      ["ढगांचा महाल", "ते एका सुंदर ढगांच्या महालात पोहोचले. तिथे छोट्या ताऱ्यांनी त्यांचे स्वागत केले."],
      ["हरवलेला प्रकाश", "महालातील प्रकाश कमी होत होता. चंद्राने सांगितले की एक सोनेरी तारा हरवला आहे."],
      ["ताऱ्यांचे राज्य", "{name} ने शांत ताऱ्यांच्या राज्यात सोनेरी तारा शोधण्यास मदत केली."],
      ["सोनेरी ताऱ्याचा शोध", "एका छोट्या ताऱ्याने चांदीसारख्या ढगामागे सोनेरी तारा दाखवला."],
      ["चांदण्यांची परतफेड", "सोनेरी तारा पुन्हा आपल्या जागी आला आणि संपूर्ण आकाश उजळून निघाले."],
      ["सुंदर स्वप्न", "चंद्राने {name} चे आभार मानले आणि घरी जाण्यासाठी सुंदर प्रकाश दिला."],
      ["शुभ रात्री", "{name} आनंदाने आपल्या बिछान्यावर परतले. चंद्र हसून म्हणाला, शुभ रात्री आणि गोड स्वप्ने."]
    ]
  }
};

// ----------------------------------
// AGE-WISE PAGE COUNT
// ----------------------------------

const getStoryPageCount = (ageGroup) => {
  const counts = {
    "0-2 Years": 8,
    "3-4 Years": 11,
    "5-7 Years": 16,
    "8-10 Years": 22
  };

  return counts[ageGroup] || 11;
};

// ----------------------------------
// STORY PAGE EXPANSION
// ----------------------------------

const expandStoryPages = (storyPages, count) => {
  if (!storyPages || storyPages.length === 0) {
    return [];
  }

  if (count <= storyPages.length) {
    return storyPages.slice(0, count);
  }

  const expanded = [];

  storyPages.forEach((item) => {
    const sentences =
      item.content.match(/[^.!?।]+[.!?।]?/g) || [item.content];

    const middle = Math.ceil(sentences.length / 2);

    const firstPart = sentences.slice(0, middle).join(" ").trim();
    const secondPart = sentences.slice(middle).join(" ").trim();

    expanded.push({
      title: item.title,
      content: firstPart
    });

    if (secondPart) {
      expanded.push({
        title: `${item.title} - Continued`,
        content: secondPart
      });
    }
  });

  while (expanded.length < count) {
    const original = storyPages[expanded.length % storyPages.length];

    expanded.push({
      title: original.title,
      content: original.content
    });
  }

  return expanded.slice(0, count);
};

const categoryMapping = {
  "Princess & Prince": "Princess & Prince",
  "Jungle Adventure": "Jungle Adventure",
  "Animal Friends": "Jungle Adventure",
  Adventure: "Jungle Adventure",
  "Space Adventure": "Space Adventure",
  "Magic & Fairy Tales": "Magic & Fairy Tales",
  "Dinosaur World": "Dinosaur World",
  "Bedtime Story": "Bedtime Stories",
  "Bedtime Stories": "Bedtime Stories",
};

// ----------------------------------
// STORY ILLUSTRATIONS
// ----------------------------------

const storyIllustrations = {
  "Princess & Prince": "/story-images/princess.png",
  "Jungle Adventure": "/story-images/jungle.png",
  "Animal Friends": "/story-images/jungle.png",
  Adventure: "/story-images/jungle.png",
  "Space Adventure": "/story-images/space.png",
  "Magic & Fairy Tales": "/story-images/fairy.png",
  "Dinosaur World": "/story-images/dino.png",
  "Bedtime Stories": "/story-images/moon.png",
};


 // ----------------------------------
 // PARSE GEMINI AI STORY INTO PAGES
 // ----------------------------------




// ----------------------------------
// PARSE AI STORY INTO PAGES
// ----------------------------------

const parseAIStory = (storyContent) => {
  if (!storyContent || !storyContent.trim()) return [];

  const sections = storyContent
    .split(/PAGE\s+\d+\s*/i)
    .filter((section) => section.trim());

  return sections.map((section, index) => ({
    title: `Page ${index + 1}`,
    content: section
      .split("\n")
      .filter((line) => line.trim())
      .join(" ")
      .trim(),
  }));
};

function GeneratedStory() {
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [audioStatus, setAudioStatus] = useState("stopped");

  // CLEANUP AUDIO
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // LOAD STORY FROM BACKEND
  useEffect(() => {
    let isMounted = true;

    const loadStory = async () => {
      try {
        const savedDraft = sessionStorage.getItem("myStoryWorldDraft");

        if (!savedDraft) {
          throw new Error(
            "Story details not found. Please create your story again."
          );
        }

        const draft = JSON.parse(savedDraft);
        const storyId = draft.id || draft.storyId;

        if (!storyId) {
          throw new Error("Story ID not found.");
        }

        const response = await api.get("accounts/stories/");

        const records = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        let savedStory = records.find(
          (item) => String(item.id) === String(storyId)
        );

        if (!savedStory) {
          throw new Error("Story not found in your account.");
        }

        // GENERATE ONLY IF CONTENT DOES NOT EXIST
        if (!savedStory.story_content?.trim()) {
          const generateResponse = await api.post(
            `accounts/stories/${storyId}/generate/`
          );

          savedStory =
            generateResponse.data.story || generateResponse.data;
        }

        const storyToSave = {
          ...draft,
          id: savedStory.id,
          storyId: savedStory.id,
          storyTitle: savedStory.title || draft.storyTitle,
          category: savedStory.category || draft.category,
          language: savedStory.language || draft.language,
          ageGroup: savedStory.age_group || draft.ageGroup,
          characterStyle:
            savedStory.character_style || draft.characterStyle,
          storyContent:
            savedStory.story_content || draft.storyContent || "",
        };

        if (!isMounted) return;

        if (!storyToSave.storyContent.trim()) {
          throw new Error("Story content is empty.");
        }

        console.log("STORY CONTENT:", storyToSave.storyContent);

        setStory(storyToSave);

        sessionStorage.setItem(
          "myStoryWorldDraft",
          JSON.stringify(storyToSave)
        );

        // SAVE STORY HISTORY
        const oldStories = JSON.parse(
          localStorage.getItem("myStoryWorldStories") || "[]"
        );

        const updatedStories = [
          storyToSave,
          ...oldStories.filter(
            (item) => String(item.id) !== String(storyToSave.id)
          ),
        ];

        localStorage.setItem(
          "myStoryWorldStories",
          JSON.stringify(updatedStories)
        );

      } catch (err) {
        console.error("Story loading error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to load your story."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStory();

    return () => {
      isMounted = false;
    };
  }, []);

  // CONVERT AI STORY INTO PAGES
  const aiPages = useMemo(() => {
    return parseAIStory(story?.storyContent || "");
  }, [story?.storyContent]);

  const storyPages =
    story && aiPages.length === 0 ? getStoryData() : [];

  const pageCount = story
    ? getStoryPageCount(story.ageGroup)
    : 0;

  const pages =
    aiPages.length > 0
      ? aiPages
      : story
      ? expandStoryPages(storyPages, pageCount)
      : [];

  const currentStoryPage = pages[currentPage];

  // RESET PAGE
  useEffect(() => {
    setCurrentPage(0);
    setAudioStatus("stopped");
  }, [story?.id]);

  // STOP AUDIO ON PAGE CHANGE
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setAudioStatus("stopped");
  }, [currentPage]);

  // NEXT PAGE
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  // PREVIOUS PAGE
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((previous) => previous - 1);
    }
  };

  // AUDIO
  const handleAudio = () => {
    if (!currentStoryPage) return;

    if (!("speechSynthesis" in window)) {
      alert("Audio is not supported in this browser.");
      return;
    }

    if (audioStatus === "playing") {
      window.speechSynthesis.cancel();
      setAudioStatus("stopped");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      currentStoryPage.content.replace(
        /\{name\}/g,
        story.childName || "Friend"
      )
    );

    const languageMap = {
      English: "en-US",
      Hindi: "hi-IN",
      Marathi: "mr-IN",
    };

    utterance.lang = languageMap[story.language] || "en-US";

    utterance.onstart = () => setAudioStatus("playing");
    utterance.onend = () => setAudioStatus("stopped");
    utterance.onerror = () => setAudioStatus("stopped");

    window.speechSynthesis.speak(utterance);
  };

  // DOWNLOAD STORY AS PDF
  const handleDownloadPDF = () => {
    if (!pages.length) {
      alert("No story available to download.");
      return;
    }

    try {
      const pdf = new jsPDF();

      pages.forEach((page, index) => {
        if (index > 0) {
          pdf.addPage();
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);

        pdf.text(
          story.storyTitle || "My Story",
          20,
          25
        );

        pdf.setFontSize(13);
        pdf.text(`Page ${index + 1}`, 20, 45);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        const content = page.content.replace(
          /\{name\}/g,
          story.childName || "Friend"
        );

        const lines = pdf.splitTextToSize(content, 170);

        pdf.text(lines, 20, 60);
      });

      const fileName = (story.storyTitle || "MyStoryWorld")
        .replace(/[^a-z0-9]/gi, "_");

      pdf.save(`${fileName}.pdf`);

    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("Unable to download PDF. Please try again.");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="generated-story-container">
        <h2>Creating your magical story...</h2>
        <p>Please wait while we prepare your story.</p>
      </div>
    );
  }

  // ERROR
  if (error || !story) {
    return (
      <div className="generated-story-container">
        <h2>Story Not Available</h2>
        <p>{error || "Please create your story again."}</p>

        <button onClick={() => navigate("/create-story")}>
          Create Story Again
        </button>
      </div>
    );
  }

  // STORY IMAGE
  const selectedImage =
    storyIllustrations[categoryMapping[story.category]] ||
    storyIllustrations[story.category];

  return (
    <div className="generated-story-container">

      <h1>{story.storyTitle}</h1>

      <p>A magical story for {story.childName}</p>

      <div className="story-image">
        {selectedImage && (
          <img src={selectedImage} alt={story.storyTitle} />
        )}
      </div>

      {pages.length > 0 ? (
        <>
          <div className="story-page">
            <h2>{currentStoryPage?.title}</h2>

            <p>
              {currentStoryPage?.content?.replace(
                /\{name\}/g,
                story.childName || "Friend"
              )}
            </p>
          </div>

          <div className="story-progress">
            Page {currentPage + 1} of {pages.length}
          </div>

          {/* PDF DOWNLOAD BUTTON */}
          <button
            className="download-pdf-btn"
            onClick={handleDownloadPDF}
          >
            📥 Download Story PDF
          </button>

          {/* STORY NAVIGATION */}
          <div className="story-navigation">

            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            <button onClick={handleAudio}>
              {audioStatus === "playing"
                ? "Stop Audio"
                : "Read Story"}
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
            >
              Next
            </button>

          </div>
        </>
      ) : (
        <div className="story-page">
          <h2>Story content not available</h2>
          <p>Please try opening this story again.</p>
        </div>
      )}

      <button
        className="generated-back-btn"
        onClick={() => navigate("/parent-dashboard")}
      >
        Back to Dashboard
      </button>

    </div>
  );
}

export default GeneratedStory;
