
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import "./ReadStory.css";


// const storyImages = {
//   1: "/story-images/princess.png",
//   2: "/story-images/jungle.png",
//   3: "/story-images/space.png",
//   4: "/story-images/fairy.png",
//   5: "/story-images/dino.png",
//   6: "/story-images/moon.png",
// };
// const stories = {
//   1: {
//     title: "The Magical Princess",
//     category: "Princess & Prince",
//     pages: [
//       {
//         title: "A Beautiful Kingdom",
//         emoji: "🏰",
//         English: "Once upon a time, there was a kind little princess named Lily. She lived in a beautiful kingdom surrounded by colorful flowers and magical trees. Lily loved helping everyone in her kingdom. Every morning, she greeted the birds and watered the flowers in the royal garden.",
//         Hindi: "एक समय की बात है, लिली नाम की एक प्यारी राजकुमारी थी। वह सुंदर फूलों और जादुई पेड़ों से घिरे राज्य में रहती थी। लिली सभी की मदद करना पसंद करती थी। हर सुबह वह पक्षियों का स्वागत करती और फूलों को पानी देती थी।",
//         Marathi: "एके काळी लिली नावाची एक गोड राजकुमारी होती. ती सुंदर फुले आणि जादुई झाडांनी वेढलेल्या राज्यात राहत होती. लिलीला सर्वांना मदत करायला आवडत असे. दररोज सकाळी ती पक्ष्यांना नमस्कार करत आणि बागेतील फुलांना पाणी देत असे."
//       },
//       {
//         title: "A Magical Discovery",
//         // emoji: "🦋",
//         English: "One sunny morning, Lily saw a beautiful butterfly sitting on a rose. Its golden wings were shining like little stars. The butterfly flew around Lily and showed her a secret path behind the garden. Lily felt excited and decided to follow it.",
//         Hindi: "एक सुंदर सुबह लिली ने गुलाब पर बैठी एक प्यारी तितली देखी। उसके सुनहरे पंख छोटे तारों की तरह चमक रहे थे। तितली लिली के चारों ओर उड़ने लगी और उसे बगीचे के पीछे एक गुप्त रास्ता दिखाया। लिली बहुत खुश हुई और उसके पीछे चल पड़ी।",
//         Marathi: "एका सुंदर सकाळी लिलीला गुलाबावर बसलेले एक सुंदर फुलपाखरू दिसले. त्याचे सोनेरी पंख छोट्या ताऱ्यांसारखे चमकत होते. फुलपाखरू लिलीभोवती फिरू लागले आणि तिला बागेमागचा एक गुप्त रस्ता दाखवला. लिलीला खूप आनंद झाला आणि ती त्याच्या मागे गेली."
//       },
//       {
//         title: "The Enchanted Forest",
//         // emoji: "🌳",
//         English: "Lily entered a magical forest filled with colorful flowers and tall trees. She met talking birds, friendly rabbits, and a tiny squirrel. The animals welcomed her warmly. They told Lily that a little lion had lost his way and needed help.",
//         Hindi: "लिली एक जादुई जंगल में पहुँची। वहाँ रंग-बिरंगे फूल और ऊँचे पेड़ थे। उसे बोलने वाले पक्षी, प्यारे खरगोश और एक छोटी गिलहरी मिली। सभी ने उसका स्वागत किया। उन्होंने बताया कि एक छोटा शेर रास्ता भूल गया है और उसे मदद चाहिए।",
//         Marathi: "लिली एका जादुई जंगलात पोहोचली. तिथे रंगीबेरंगी फुले आणि उंच झाडे होती. तिला बोलणारे पक्षी, गोड ससे आणि एक छोटी खार भेटली. सर्वांनी तिचे स्वागत केले. त्यांनी सांगितले की एक छोटा सिंह रस्ता चुकला आहे आणि त्याला मदतीची गरज आहे."
//       },
//       {
//         title: "A Brave Little Hero",
//         // emoji: "🦁",
//         English: "Lily heard a soft crying sound near a big tree. She found a little lion hiding behind a bush. He was scared because he could not find his family. Lily smiled and promised to help him. Together, they followed the animal footprints through the forest.",
//         Hindi: "लिली को एक बड़े पेड़ के पास रोने की आवाज़ सुनाई दी। उसे झाड़ी के पीछे एक छोटा शेर मिला। वह डर गया था क्योंकि उसे अपना परिवार नहीं मिल रहा था। लिली ने मुस्कुराकर उसकी मदद करने का वादा किया। दोनों जंगल में पैरों के निशान देखते हुए आगे बढ़े।",
//         Marathi: "लिलीला एका मोठ्या झाडाजवळ रडण्याचा आवाज आला. तिला झुडपामागे एक छोटा सिंह दिसला. तो घाबरला होता कारण त्याला त्याचे कुटुंब सापडत नव्हते. लिलीने हसून त्याला मदत करण्याचे वचन दिले. दोघेही जंगलातील पावलांच्या खुणा पाहत पुढे गेले."
//       },
//       {
//         title: "The Happy Reunion",
//         // emoji: "🌈",
//         English: "After walking for some time, Lily and the little lion heard a familiar roar. His family was waiting near a beautiful waterfall. The little lion ran happily towards them. His mother thanked Lily for her kindness. Everyone celebrated with a joyful dance.",
//         Hindi: "कुछ देर चलने के बाद लिली और छोटे शेर को एक परिचित दहाड़ सुनाई दी। उसका परिवार सुंदर झरने के पास इंतज़ार कर रहा था। छोटा शेर खुशी से उनकी ओर दौड़ा। उसकी माँ ने लिली को धन्यवाद दिया। सभी ने खुशी से नाचकर जश्न मनाया।",
//         Marathi: "थोडा वेळ चालल्यानंतर लिली आणि छोट्या सिंहाला ओळखीची डरकाळी ऐकू आली. त्याचे कुटुंब सुंदर धबधब्याजवळ त्याची वाट पाहत होते. छोटा सिंह आनंदाने त्यांच्याकडे धावला. त्याच्या आईने लिलीचे आभार मानले. सर्वांनी आनंदाने नाचून उत्सव साजरा केला."
//       },
//       {
//         title: "The Princess of Kindness",
//         emoji: "👑",
//         English: "Lily returned to her kingdom as a happy princess. She shared her adventure with everyone. From that day, she helped people, animals, and friends. Everyone loved her because she was kind and brave. Lily learned that the greatest magic is a kind heart.",
//         Hindi: "लिली खुशी-खुशी अपने राज्य लौट आई। उसने अपना रोमांचक सफर सबको बताया। वह सभी की मदद करने लगी। सभी उससे प्यार करते थे क्योंकि वह दयालु और बहादुर थी। लिली ने सीखा कि सबसे बड़ा जादू एक दयालु दिल है।",
//         Marathi: "लिली आनंदाने आपल्या राज्यात परत आली. तिने सर्वांना तिच्या साहसाची गोष्ट सांगितली. ती सर्वांना मदत करू लागली. तिच्या दयाळू आणि धाडसी स्वभावामुळे सर्वजण तिच्यावर प्रेम करत होते. लिलीला समजले की सर्वात मोठी जादू म्हणजे प्रेमळ मन."
//       }
//     ]
//   },

//   2: {
//     title: "The Friendly Jungle",
//     category: "Jungle Adventure",
//     pages: [
//       {
//         title: "Welcome to the Jungle",
//         emoji: "🌴",
//         English: "In a green jungle lived Leo, a friendly little lion. He loved meeting new animals and making friends. Every morning, he played near the river and greeted all the animals. Leo always believed that everyone deserved a good friend.",
//         Hindi: "हरे-भरे जंगल में लियो नाम का एक प्यारा शेर रहता था। उसे नए जानवरों से मिलना और दोस्त बनाना पसंद था। हर सुबह वह नदी के पास खेलता और सभी जानवरों का स्वागत करता था।",
//         Marathi: "हिरव्यागार जंगलात लिओ नावाचा एक गोड सिंह राहत होता. त्याला नवीन प्राण्यांना भेटायला आणि मित्र बनवायला आवडत असे. दररोज सकाळी तो नदीजवळ खेळत असे आणि सर्व प्राण्यांना भेटत असे."
//       },
//       {
//         title: "A New Friend",
//         emoji: "🐘",
//         English: "One sunny day, Leo met Ellie the elephant. Ellie looked sad because she could not find her way to the river. Leo asked her what had happened. Ellie explained that she had wandered too far while looking for fresh leaves.",
//         Hindi: "एक दिन लियो की मुलाकात एली हाथी से हुई। एली उदास थी क्योंकि उसे नदी का रास्ता नहीं मिल रहा था। लियो ने उससे पूछा कि क्या हुआ। एली ने बताया कि वह ताज़ी पत्तियाँ ढूँढते हुए बहुत दूर आ गई थी।",
//         Marathi: "एका सुंदर दिवशी लिओला एली नावाची हत्तीण भेटली. एली उदास होती कारण तिला नदीचा रस्ता सापडत नव्हता. लिओने तिला काय झाले असे विचारले. तिने सांगितले की ताजी पाने शोधताना ती खूप दूर आली होती."
//       },
//       {
//         title: "The Jungle Team",
//         emoji: "🐒",
//         English: "A clever monkey named Momo and a colorful parrot joined them. Momo climbed a tall tree to look for the river. The parrot flew high above the forest. They decided to work together and find the safest path.",
//         Hindi: "मोमो नाम का एक होशियार बंदर और रंगीन तोता उनके साथ आए। मोमो नदी का रास्ता देखने के लिए ऊँचे पेड़ पर चढ़ गया। तोता जंगल के ऊपर उड़ने लगा। सभी ने मिलकर रास्ता ढूँढने का फैसला किया।",
//         Marathi: "मोमो नावाचे हुशार माकड आणि एक रंगीत पोपट त्यांच्यासोबत आले. मोमो नदी शोधण्यासाठी उंच झाडावर चढला. पोपट जंगलावरून उडू लागला. सर्वांनी मिळून सुरक्षित रस्ता शोधण्याचे ठरवले."
//       },
//       {
//         title: "The Big Discovery",
//         emoji: "💧",
//         English: "The friends discovered a small path hidden behind the bushes. They followed it and soon heard the sound of flowing water. At last, they found the sparkling river. Ellie was very happy and thanked all her friends.",
//         Hindi: "दोस्तों को झाड़ियों के पीछे एक छोटा रास्ता मिला। वे उस रास्ते पर चले और उन्हें पानी की आवाज़ सुनाई दी। आखिरकार उन्हें चमकती हुई नदी मिल गई। एली बहुत खुश हुई और उसने अपने दोस्तों को धन्यवाद दिया।",
//         Marathi: "मित्रांना झुडपांमागे एक छोटा रस्ता सापडला. ते त्या रस्त्याने पुढे गेले आणि त्यांना पाण्याचा आवाज ऐकू आला. शेवटी त्यांना चमकणारी नदी सापडली. एली खूप आनंदी झाली आणि तिने मित्रांचे आभार मानले."
//       },
//       {
//         title: "A Jungle Celebration",
//         emoji: "🎉",
//         English: "All the jungle animals gathered near the river. They brought fruits, flowers, and sweet berries. Ellie shared her favorite fruits with everyone. The friends laughed and played together until the sun began to set.",
//         Hindi: "जंगल के सभी जानवर नदी के पास इकट्ठा हुए। वे फल, फूल और मीठी बेरियाँ लाए। एली ने अपने पसंदीदा फल सभी के साथ बाँटे। सभी दोस्त सूर्यास्त तक हँसते और खेलते रहे।",
//         Marathi: "जंगलातील सर्व प्राणी नदीजवळ एकत्र आले. त्यांनी फळे, फुले आणि गोड बेरी आणल्या. एलीने तिची आवडती फळे सर्वांसोबत वाटली. सूर्यास्त होईपर्यंत सर्व मित्र हसत आणि खेळत राहिले."
//       },
//       {
//         title: "Friends Forever",
//         emoji: "❤️",
//         English: "Leo, Ellie, Momo, and the parrot became the best of friends. They promised to help each other whenever someone needed them. Every day, they explored the jungle together. They learned that teamwork and friendship make every adventure special.",
//         Hindi: "लियो, एली, मोमो और तोता अच्छे दोस्त बन गए। उन्होंने एक-दूसरे की मदद करने का वादा किया। वे हर दिन साथ में जंगल घूमते थे। उन्होंने सीखा कि दोस्ती और मिलकर काम करना हर साहस को खास बनाता है।",
//         Marathi: "लिओ, एली, मोमो आणि पोपट खूप चांगले मित्र बनले. गरज पडल्यास एकमेकांना मदत करण्याचे त्यांनी ठरवले. ते रोज एकत्र जंगलात फिरत असत. मैत्री आणि एकत्र काम केल्याने प्रत्येक साहस खास बनते हे त्यांना समजले."
//       }
//     ]
//   },

//   3: {
//     title: "Journey to the Stars",
//     category: "Space Adventure",
//     pages: [
//       {
//         title: "The Little Astronaut",
//         emoji: "👩‍🚀",
//         English: "Mia loved looking at the stars. Every night, she sat near her bedroom window and imagined visiting the planets. She dreamed of exploring space in her own rocket. Her room was filled with pictures of stars and planets.",
//         Hindi: "मिया को तारे देखना बहुत पसंद था। हर रात वह अपनी खिड़की के पास बैठकर ग्रहों पर जाने का सपना देखती थी। वह अपने रॉकेट में अंतरिक्ष घूमना चाहती थी।",
//         Marathi: "मियाला तारे पाहायला खूप आवडत असे. दररोज रात्री ती खिडकीजवळ बसून ग्रहांवर जाण्याचे स्वप्न पाहत असे. तिला स्वतःच्या रॉकेटमधून अंतराळात जायचे होते."
//       },
//       {
//         title: "Blast Off!",
//         emoji: "🚀",
//         English: "One exciting night, Mia found a shiny little rocket in her garden. She climbed inside and fastened her seat belt. The countdown began: three, two, one! The rocket flew high into the sky, leaving a trail of sparkling light.",
//         Hindi: "एक रोमांचक रात मिया को अपने बगीचे में एक चमकता हुआ रॉकेट मिला। वह उसमें बैठ गई और अपनी सीट बेल्ट बाँध ली। तीन, दो, एक! रॉकेट चमकती रोशनी के साथ आसमान में उड़ गया।",
//         Marathi: "एका रोमांचक रात्री मियाला तिच्या बागेत एक चमकणारे रॉकेट दिसले. ती त्यात बसली आणि सीट बेल्ट लावली. तीन, दोन, एक! रॉकेट चमकदार प्रकाश सोडत आकाशात झेपावले."
//       },
//       {
//         title: "A Colorful Planet",
//         emoji: "🪐",
//         English: "Mia landed on a colorful planet filled with purple mountains and blue lakes. Friendly little aliens welcomed her with smiles. They showed her beautiful crystal caves and glowing flowers. Mia was amazed by everything she saw.",
//         Hindi: "मिया एक रंगीन ग्रह पर पहुँची। वहाँ बैंगनी पहाड़ और नीली झीलें थीं। प्यारे एलियंस ने मुस्कुराकर उसका स्वागत किया। उन्होंने उसे सुंदर गुफाएँ और चमकते फूल दिखाए।",
//         Marathi: "मिया एका रंगीत ग्रहावर उतरली. तिथे जांभळे पर्वत आणि निळे तलाव होते. छोट्या एलियन्सनी हसून तिचे स्वागत केले. त्यांनी तिला सुंदर गुहा आणि चमकणारी फुले दाखवली."
//       },
//       {
//         title: "The Lost Star",
//         emoji: "⭐",
//         English: "While exploring the planet, Mia found a tiny star hiding behind a rock. The star had fallen from the sky and could not find its way home. Mia promised to help. The friendly aliens showed her a special path leading to the sky bridge.",
//         Hindi: "ग्रह पर घूमते समय मिया को एक छोटी तारा चट्टान के पीछे मिला। वह आसमान से गिर गया था और घर का रास्ता भूल गया था। मिया ने उसकी मदद करने का वादा किया।",
//         Marathi: "ग्रहावर फिरताना मियाला एका खडकामागे छोटा तारा दिसला. तो आकाशातून खाली पडला होता आणि त्याला घरी जाण्याचा रस्ता सापडत नव्हता. मियाने त्याला मदत करण्याचे वचन दिले."
//       },
//       {
//         title: "Back to the Sky",
//         emoji: "🌟",
//         English: "Mia and her new friends climbed the sky bridge. At the top, the little star began to shine brighter and brighter. It floated gently into the sky and joined its family. The star twinkled happily to thank Mia.",
//         Hindi: "मिया और उसके नए दोस्त आकाश के पुल पर चढ़े। ऊपर पहुँचकर छोटा तारा फिर से चमकने लगा। वह धीरे-धीरे आसमान में जाकर अपने परिवार से मिल गया।",
//         Marathi: "मिया आणि तिचे नवीन मित्र आकाशाच्या पुलावर चढले. वर पोहोचल्यावर छोटा तारा पुन्हा चमकू लागला. तो हळूहळू आकाशात गेला आणि आपल्या कुटुंबाला भेटला."
//       },
//       {
//         title: "A Dream Come True",
//         emoji: "🌎",
//         English: "Mia returned home with wonderful memories of her space adventure. She looked at the stars from her bedroom window and smiled. She learned that curiosity, courage, and helping others make every journey special. One day, she hoped to become a real astronaut.",
//         Hindi: "मिया अपने अंतरिक्ष सफर की सुंदर यादों के साथ घर लौट आई। उसने सीखा कि जिज्ञासा, साहस और दूसरों की मदद हर सफर को खास बनाते हैं। उसने एक दिन अंतरिक्ष यात्री बनने का सपना देखा।",
//         Marathi: "मिया अंतराळातील सुंदर आठवणी घेऊन घरी परतली. तिने शिकले की जिज्ञासा, धैर्य आणि इतरांना मदत केल्याने प्रत्येक प्रवास खास बनतो. तिने एक दिवस खरी अंतराळवीर होण्याचे स्वप्न पाहिले."
//       }
//     ]
//   },

//   4: {
//     title: "The Little Fairy",
//     category: "Magic & Fairy Tales",
//     pages: [
//       {
//         title: "The Tiny Fairy",
//         emoji: "🧚",
//         English: "In a magical garden lived a tiny fairy named Bella. She had sparkling wings and a little magic wand. Bella loved helping flowers grow and making butterflies happy. Every creature in the garden loved her.",
//         Hindi: "एक जादुई बगीचे में बेला नाम की एक छोटी परी रहती थी। उसके चमकते पंख और एक जादुई छड़ी थी। उसे फूलों और तितलियों की मदद करना पसंद था।",
//         Marathi: "एका जादुई बागेत बेला नावाची छोटी परी राहत होती. तिचे पंख चमकत होते आणि तिच्याकडे जादूची कांडी होती. तिला फुलांना आणि फुलपाखरांना मदत करायला आवडत असे."
//       },
//       {
//         title: "A Sad Flower",
//         emoji: "🌷",
//         English: "One morning, Bella found a little flower sitting sadly near a stone. The flower had lost all its beautiful colors. Bella asked what had happened. The flower explained that it had not received sunlight for many days.",
//         Hindi: "एक सुबह बेला को पत्थर के पास एक उदास फूल मिला। उसके सारे सुंदर रंग खो गए थे। बेला ने पूछा कि क्या हुआ। फूल ने बताया कि उसे कई दिनों से धूप नहीं मिली थी।",
//         Marathi: "एका सकाळी बेलाला दगडाजवळ एक उदास फूल दिसले. त्याचे सर्व सुंदर रंग हरवले होते. बेलाने त्याला काय झाले असे विचारले. अनेक दिवस सूर्यप्रकाश न मिळाल्याचे फुलाने सांगितले."
//       },
//       {
//         title: "A Magical Idea",
//         emoji: "✨",
//         English: "Bella wanted to help the flower. She asked the butterflies and bees to bring tiny drops of morning dew. She collected golden sunlight with her magic wand. Everyone worked together to bring happiness back to the little flower.",
//         Hindi: "बेला फूल की मदद करना चाहती थी। उसने तितलियों और मधुमक्खियों से ओस की बूँदें लाने को कहा। उसने अपनी जादुई छड़ी से सुनहरी धूप इकट्ठी की।",
//         Marathi: "बेलाला त्या फुलाची मदत करायची होती. तिने फुलपाखरे आणि मधमाशांना दवाचे थेंब आणायला सांगितले. तिने आपल्या जादूच्या कांडीने सोनेरी सूर्यप्रकाश गोळा केला."
//       },
//       {
//         title: "The Colors Return",
//         emoji: "🌈",
//         English: "Bella gently sprinkled the magical drops on the flower. Slowly, its petals became pink, yellow, and purple again. The flower stood tall and smiled. The butterflies danced around it with joy.",
//         Hindi: "बेला ने धीरे से जादुई बूँदें फूल पर छिड़कीं। धीरे-धीरे उसकी पंखुड़ियाँ फिर से गुलाबी, पीली और बैंगनी हो गईं। फूल खुशी से खिल उठा।",
//         Marathi: "बेलाने हळूच जादुई थेंब फुलावर शिंपडले. हळूहळू त्याच्या पाकळ्या पुन्हा गुलाबी, पिवळ्या आणि जांभळ्या झाल्या. फूल आनंदाने फुलले."
//       },
//       {
//         title: "A Garden of Happiness",
//         emoji: "🌸",
//         English: "All the flowers in the garden began to bloom. The bees collected sweet nectar and the butterflies danced in the sunshine. Bella felt happy because everyone had worked together. The garden became more beautiful than ever.",
//         Hindi: "बगीचे के सभी फूल खिलने लगे। मधुमक्खियाँ मीठा रस इकट्ठा करने लगीं और तितलियाँ धूप में नाचने लगीं। बेला बहुत खुश हुई।",
//         Marathi: "बागेतील सर्व फुले उमलू लागली. मधमाशा गोड मध गोळा करू लागल्या आणि फुलपाखरे उन्हात नाचू लागली. सर्वांनी एकत्र काम केल्यामुळे बेला आनंदी झाली."
//       },
//       {
//         title: "The Magic of Kindness",
//         emoji: "🦋",
//         English: "Bella's garden became the most beautiful garden in the land. Every flower was colorful and every butterfly was happy. Bella smiled because she had helped everyone. She learned that kindness is the most beautiful magic of all.",
//         Hindi: "बेला का बगीचा पूरे राज्य में सबसे सुंदर बन गया। सभी फूल रंगीन थे और तितलियाँ खुश थीं। बेला ने सीखा कि दयालुता सबसे सुंदर जादू है।",
//         Marathi: "बेलाची बाग संपूर्ण राज्यातील सर्वात सुंदर बाग बनली. प्रत्येक फूल रंगीत होते आणि फुलपाखरे आनंदी होती. सर्वांना मदत केल्यामुळे बेला आनंदी झाली. दयाळूपणा हीच सर्वात सुंदर जादू आहे."
//       }
//     ]
//   },

//   5: {
//     title: "Dino's New Friend",
//     category: "Dinosaur World",
//     pages: [
//       {
//         title: "A Little Dinosaur",
//         emoji: "🦖",
//         English: "Dino was a little green dinosaur who lived in a beautiful valley. He loved eating fresh leaves and playing near the river. But sometimes he felt lonely because he did not have a friend to play with.",
//         Hindi: "डिनो एक छोटा हरा डायनासोर था। वह एक सुंदर घाटी में रहता था। उसे ताज़ी पत्तियाँ खाना और नदी के पास खेलना पसंद था। लेकिन उसके पास खेलने के लिए कोई दोस्त नहीं था।",
//         Marathi: "डिनो एक छोटा हिरवा डायनासोर होता. तो एका सुंदर दरीत राहत होता. त्याला ताजी पाने खायला आणि नदीजवळ खेळायला आवडत असे. पण त्याला खेळण्यासाठी मित्र नव्हता."
//       },
//       {
//         title: "A Strange Sound",
//         emoji: "🌿",
//         English: "One sunny day, Dino was walking through the forest when he heard a tiny sound behind a big tree. He stopped and listened carefully. The sound came again. Dino became curious and slowly walked closer.",
//         Hindi: "एक दिन डिनो जंगल में घूम रहा था। तभी उसे एक बड़े पेड़ के पीछे से छोटी सी आवाज़ सुनाई दी। वह रुका और ध्यान से सुनने लगा। डिनो धीरे-धीरे उस पेड़ के पास गया।",
//         Marathi: "एका दिवशी डिनो जंगलात फिरत होता. तेव्हा त्याला मोठ्या झाडामागून एक छोटासा आवाज ऐकू आला. तो थांबला आणि काळजीपूर्वक ऐकू लागला. डिनो हळूहळू झाडाजवळ गेला."
//       },
//       {
//         title: "A Shy Friend",
//         emoji: "🐣",
//         English: "Behind the tree, Dino found a tiny baby dinosaur. The little dinosaur was hiding because he was shy. Dino smiled and introduced himself. He asked if the little dinosaur wanted to play together.",
//         Hindi: "पेड़ के पीछे डिनो को एक छोटा डायनासोर मिला। वह शर्म के कारण छिपा हुआ था। डिनो मुस्कुराया और अपना परिचय दिया। उसने साथ खेलने के लिए पूछा।",
//         Marathi: "झाडामागे डिनोला एक छोटा डायनासोर दिसला. तो लाजाळू असल्यामुळे लपला होता. डिनोने हसून स्वतःची ओळख करून दिली आणि त्याला एकत्र खेळायचे का असे विचारले."
//       },
//       {
//         title: "Playing Together",
//         emoji: "⚽",
//         English: "The baby dinosaur slowly came out. Dino showed him his favorite games. They played hide and seek, ran around the trees, and splashed water near the river. Soon, the little dinosaur was laughing happily.",
//         Hindi: "छोटा डायनासोर धीरे-धीरे बाहर आया। डिनो ने उसे अपने पसंदीदा खेल दिखाए। दोनों ने लुका-छिपी खेली और नदी के पास पानी में मस्ती की।",
//         Marathi: "छोटा डायनासोर हळूहळू बाहेर आला. डिनोने त्याला आपले आवडते खेळ दाखवले. दोघांनी लपाछपी खेळली आणि नदीजवळ पाण्यात मजा केली."
//       },
//       {
//         title: "A Wonderful Adventure",
//         emoji: "🌳",
//         English: "The two friends decided to explore the valley. They found colorful butterflies, juicy fruits, and a beautiful waterfall. When the baby dinosaur became tired, Dino shared his food and helped him rest under a tree.",
//         Hindi: "दोनों दोस्तों ने घाटी घूमने का फैसला किया। उन्हें रंगीन तितलियाँ, मीठे फल और सुंदर झरना मिला। जब छोटा डायनासोर थक गया, तो डिनो ने अपना खाना उसके साथ बाँटा।",
//         Marathi: "दोन्ही मित्रांनी दरीत फिरण्याचे ठरवले. त्यांना रंगीत फुलपाखरे, गोड फळे आणि सुंदर धबधबा दिसला. छोटा डायनासोर थकल्यावर डिनोने त्याच्यासोबत आपले खाणे वाटून घेतले."
//       },
//       {
//         title: "Best Friends Forever",
//         emoji: "💚",
//         English: "Dino and his new friend played together every day. They shared food, explored the forest, and helped other little dinosaurs. Dino was happy that he had said hello that day. He learned that a little kindness can create a big friendship.",
//         Hindi: "डिनो और उसका नया दोस्त हर दिन साथ खेलते थे। वे खाना बाँटते और जंगल घूमते थे। डिनो खुश था कि उसने उस दिन दोस्त को नमस्ते कहा था। उसने सीखा कि छोटी सी दयालुता बड़ी दोस्ती बना सकती है।",
//         Marathi: "डिनो आणि त्याचा नवीन मित्र रोज एकत्र खेळू लागले. ते जेवण वाटून खात आणि जंगलात फिरत असत. त्या दिवशी आपण मित्राला नमस्कार केला याचा डिनोला आनंद झाला. छोटासा प्रेमळ प्रयत्न मोठी मैत्री निर्माण करू शकतो."
//       }
//     ]
//   },

//   6: {
//     title: "The Sleepy Moon",
//     category: "Bedtime Stories",
//     pages: [
//       {
//         title: "A Sleepy Moon",
//         emoji: "🌙",
//         English: "High in the sky lived a sleepy little moon. Every night, it watched over the world. It loved seeing children playing during the day and sleeping peacefully at night. The moon always smiled at the beautiful world below.",
//         Hindi: "आसमान में एक प्यारा सा चाँद रहता था। हर रात वह दुनिया को देखता था। उसे बच्चों को खेलते और रात में शांति से सोते देखना पसंद था।",
//         Marathi: "आकाशात एक गोड चंद्र राहत होता. प्रत्येक रात्री तो संपूर्ण जगाकडे पाहत असे. मुलांना दिवसा खेळताना आणि रात्री शांत झोपताना पाहून त्याला आनंद होत असे."
//       },
//       {
//         title: "The Twinkling Stars",
//         emoji: "⭐",
//         English: "One night, the little stars danced around the moon. They filled the sky with sparkling light. The moon laughed softly and asked the stars to sing a gentle bedtime song for all the sleeping children.",
//         Hindi: "एक रात छोटे तारे चाँद के चारों ओर नाचने लगे। उन्होंने आसमान को चमकदार रोशनी से भर दिया। चाँद ने उनसे बच्चों के लिए प्यारा सा गीत गाने को कहा।",
//         Marathi: "एका रात्री छोटे तारे चंद्राभोवती नाचू लागले. त्यांनी आकाश चमकदार प्रकाशाने भरून टाकले. चंद्राने त्यांना झोपलेल्या मुलांसाठी गोड गाणे म्हणायला सांगितले."
//       },
//       {
//         title: "A Gentle Cloud",
//         emoji: "☁️",
//         English: "A soft white cloud floated near the moon. It noticed that the moon looked tired. The cloud offered its fluffy side as a pillow. The moon thanked the cloud and rested its head comfortably.",
//         Hindi: "एक मुलायम सफेद बादल चाँद के पास आया। उसने देखा कि चाँद थका हुआ था। बादल ने उसे अपना मुलायम हिस्सा तकिए की तरह दिया। चाँद ने धन्यवाद कहा।",
//         Marathi: "एक मऊ पांढरा ढग चंद्राजवळ आला. चंद्र थकलेला दिसत होता. ढगाने त्याला आपला मऊ भाग उशी म्हणून दिला. चंद्राने ढगाचे आभार मानले."
//       },
//       {
//         title: "A Little Dream",
//         emoji: "💤",
//         English: "As the moon rested, it dreamed of a peaceful world. It saw children sleeping in cozy beds, little animals resting in their homes, and flowers closing their petals for the night. Everything was calm and beautiful.",
//         Hindi: "आराम करते समय चाँद ने एक शांत दुनिया का सपना देखा। उसने बच्चों को आरामदायक बिस्तरों में सोते, जानवरों को अपने घरों में आराम करते और फूलों को रात में बंद होते देखा।",
//         Marathi: "विश्रांती घेताना चंद्राने एका शांत जगाचे स्वप्न पाहिले. त्याने मुलांना आरामदायक अंथरुणात झोपलेले, प्राण्यांना घरात विसावलेले आणि फुलांना पाकळ्या मिटताना पाहिले."
//       },
//       {
//         title: "Sweet Dreams",
//         emoji: "🌠",
//         English: "The moon sent tiny silver dreams to every sleeping child. Some children dreamed of flying with butterflies. Others dreamed of magical castles and friendly animals. The stars watched over everyone with their gentle light.",
//         Hindi: "चाँद ने हर सोते हुए बच्चे को छोटे-छोटे सुंदर सपने भेजे। कुछ बच्चों ने तितलियों के साथ उड़ने का सपना देखा। कुछ ने जादुई महलों और प्यारे जानवरों के सपने देखे।",
//         Marathi: "चंद्राने प्रत्येक झोपलेल्या मुलाला सुंदर स्वप्ने पाठवली. काही मुलांनी फुलपाखरांसोबत उडण्याचे स्वप्न पाहिले. काहींनी जादुई किल्ले आणि गोड प्राण्यांची स्वप्ने पाहिली."
//       },
//       {
//         title: "Good Night, Little One",
//         emoji: "🌌",
//         English: "The moon rested on its fluffy cloud pillow. The stars twinkled softly, and the whole world became quiet. The moon whispered, 'Good night, little friends. May your dreams be full of happiness and magic.' Everyone slept peacefully.",
//         Hindi: "चाँद अपने मुलायम बादल के तकिए पर आराम करने लगा। तारे धीरे-धीरे चमक रहे थे। चाँद ने कहा, 'शुभ रात्रि प्यारे दोस्तों। तुम्हारे सपने खुशियों और जादू से भरे हों।' सभी शांति से सो गए।",
//         Marathi: "चंद्र मऊ ढगाच्या उशीवर विसावला. तारे हळूच चमकत होते आणि संपूर्ण जग शांत झाले. चंद्र म्हणाला, 'शुभ रात्री छोट्या मित्रांनो. तुमची स्वप्ने आनंदाने आणि जादूने भरलेली असोत.' सर्वजण शांत झोपी गेले."
//       }
//     ]
//   }
// };

// function ReadStory() {
//   const { id } = useParams();

//   const [currentPage, setCurrentPage] = useState(0);
//   const [language, setLanguage] = useState("English");
//   const [fontSize, setFontSize] = useState("normal");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const utteranceRef = useRef(null);

//   const story = stories[id];

//   // Stop audio
//   const stopSpeaking = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel();
//     }

//     utteranceRef.current = null;
//     setIsSpeaking(false);
//     setIsPaused(false);
//   };

//   // Stop audio when component is closed
//   useEffect(() => {
//     return () => {
//       if ("speechSynthesis" in window) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   // Reset when story changes
//   useEffect(() => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel();
//     }

//     utteranceRef.current = null;
//     setIsSpeaking(false);
//     setIsPaused(false);
//     setCurrentPage(0);
//   }, [id]);

//   // Read story aloud
//   const handleReadAloud = () => {
//     if (!("speechSynthesis" in window)) {
//       alert("Your browser does not support Read Aloud.");
//       return;
//     }

//     stopSpeaking();

//     const page = story?.pages[currentPage];

//     if (!page) return;

//     const languageSettings = {
//       English: "en-IN",
//       Hindi: "hi-IN",
//       Marathi: "mr-IN",
//     };

//     const utterance = new SpeechSynthesisUtterance(
//       `${page.title}. ${page[language]}`
//     );

//     utterance.lang = languageSettings[language];
//     utterance.rate = 0.85;
//     utterance.pitch = 1;

//     utterance.onstart = () => {
//       setIsSpeaking(true);
//       setIsPaused(false);
//     };

//     utterance.onend = () => {
//       setIsSpeaking(false);
//       setIsPaused(false);
//       utteranceRef.current = null;
//     };

//     utterance.onerror = () => {
//       setIsSpeaking(false);
//       setIsPaused(false);
//       utteranceRef.current = null;
//     };

//     utteranceRef.current = utterance;

//     window.speechSynthesis.speak(utterance);
//   };

//   // Pause and Resume
//   const handlePauseResume = () => {
//     if (!("speechSynthesis" in window)) return;

//     if (window.speechSynthesis.paused) {
//       window.speechSynthesis.resume();
//       setIsPaused(false);
//     } else if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.pause();
//       setIsPaused(true);
//     }
//   };

//   // Stop audio
//   const handleStop = () => {
//     stopSpeaking();
//   };

//   if (!story) {
//     return (
//       <div className="read-story-page">
//         <h2>Story Not Found</h2>
//         <Link to="/stories">Back to Stories</Link>
//       </div>
//     );
//   }

//   const page = story.pages[currentPage];

//   // Change language
//   const handleLanguageChange = (value) => {
//     stopSpeaking();
//     setLanguage(value);
//   };

//   // Previous page
//   const handlePrevious = () => {
//     stopSpeaking();
//     setCurrentPage((prev) => Math.max(0, prev - 1));
//   };

//   // Next page
//   const handleNext = () => {
//     stopSpeaking();
//     setCurrentPage((prev) =>
//       Math.min(story.pages.length - 1, prev + 1)
//     );
//   };

//   return (
//     <div className="read-story-page">

//       {/* TOP SECTION */}
//       <div className="reading-top">
//         <Link
//           to="/stories"
//           className="back-to-stories"
//           onClick={stopSpeaking}
//         >
//           ← Back to Stories
//         </Link>

//         <select
//           value={language}
//           onChange={(e) => handleLanguageChange(e.target.value)}
//           className="story-language"
//           aria-label="Choose story language"
//         >
//           <option value="English">English</option>
//           <option value="Hindi">हिन्दी</option>
//           <option value="Marathi">मराठी</option>
//         </select>
//       </div>

//       {/* STORY HEADING */}
//       <div className="reading-heading">
//         <span>✨ {story.category.toUpperCase()}</span>

//         <h1>{story.title}</h1>

//         <p>A beautiful adventure waiting just for you!</p>
//       </div>

//       {/* STORY CARD */}
//       <div className="reading-card">

//         {/* FONT SIZE */}
//         <div className="reading-font-controls">
//           <span>Text Size:</span>

//           <button
//             type="button"
//             className={fontSize === "small" ? "active" : ""}
//             onClick={() => setFontSize("small")}
//           >
//             A−
//           </button>

//           <button
//             type="button"
//             className={fontSize === "normal" ? "active" : ""}
//             onClick={() => setFontSize("normal")}
//           >
//             A
//           </button>

//           <button
//             type="button"
//             className={fontSize === "large" ? "active" : ""}
//             onClick={() => setFontSize("large")}
//           >
//             A+
//           </button>
//         </div>

//         {/* STORY ILLUSTRATION */}
//         <div className="reading-illustration">
//   <img
//     src={storyImages[id]}
//     alt={story.title}
//     onError={(e) => {
//       e.currentTarget.style.display = "none";
//     }}
//   />

//   <span className="illustration-fallback">
//     {page.emoji}
//   </span>

//   <div className="illustration-sparkle">✨</div>
// </div>

//         {/* STORY CONTENT */}
//         <div className="reading-content">
//           <span className="reading-page-number">
//             PAGE {currentPage + 1} OF {story.pages.length}
//           </span>

//           <h2>{page.title}</h2>

//           <p className={`story-text ${fontSize}`}>
//             {page[language]}
//           </p>
//         </div>

//         {/* READ ALOUD CONTROLS */}
//         <div className="read-aloud-controls">

//           <button
//             type="button"
//             className="read-aloud-button"
//             onClick={handleReadAloud}
//           >
//             🔊 Read Aloud
//           </button>

//           <button
//             type="button"
//             className="audio-secondary-button"
//             onClick={handlePauseResume}
//             disabled={!isSpeaking}
//           >
//             {isPaused ? "▶ Resume" : "⏸ Pause"}
//           </button>

//           <button
//             type="button"
//             className="audio-secondary-button"
//             onClick={handleStop}
//             disabled={!isSpeaking && !isPaused}
//           >
//             ⏹ Stop
//           </button>

//         </div>

//         <p className="audio-language-note">
//           Audio Language: {language}
//           <br />
//           Available voices depend on your browser and device.
//         </p>

//         {/* PROGRESS BAR */}
//         <div
//           className="reading-progress"
//           role="progressbar"
//           aria-valuenow={currentPage + 1}
//           aria-valuemin={1}
//           aria-valuemax={story.pages.length}
//         >
//           <div
//             className="reading-progress-fill"
//             style={{
//               width: `${
//                 ((currentPage + 1) / story.pages.length) * 100
//               }%`,
//             }}
//           />
//         </div>

//         {/* PAGE CONTROLS */}
//         <div className="reading-controls">

//           <button
//             type="button"
//             onClick={handlePrevious}
//             disabled={currentPage === 0}
//           >
//             ← Previous
//           </button>

//           <span>
//             {currentPage + 1} / {story.pages.length}
//           </span>

//           <button
//             type="button"
//             onClick={handleNext}
//             disabled={currentPage === story.pages.length - 1}
//           >
//             Next Page →
//           </button>

//         </div>

//         {/* STORY COMPLETED */}
//         {currentPage === story.pages.length - 1 && (
//           <div className="story-complete">
//             🎉 You completed the story!
//             Great job, little reader!

//             <br />

//             <Link
//               to="/stories"
//               onClick={stopSpeaking}
//             >
//               Read Another Story →
//             </Link>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



// export default ReadStory;


import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./ReadStory.css";

const storyImages = {
  1: "/story-images/princess.png",
  2: "/story-images/jungle.png",
  3: "/story-images/space.png",
  4: "/story-images/fairy.png",
  5: "/story-images/dino.png",
  6: "/story-images/moon.png",
};

const stories = {
  1: {
    title: "The Magical Princess",
    category: "Princess & Prince",
    pages: [
      {
        title: "A Beautiful Kingdom",
        English: "Once upon a time, there was a kind little princess named Lily. She lived in a beautiful kingdom surrounded by colorful flowers and magical trees. Lily loved helping everyone in her kingdom. Every morning, she greeted the birds and watered the flowers in the royal garden.",
        Hindi: "एक समय की बात है, लिली नाम की एक प्यारी राजकुमारी थी। वह सुंदर फूलों और जादुई पेड़ों से घिरे राज्य में रहती थी। लिली सभी की मदद करना पसंद करती थी। हर सुबह वह पक्षियों का स्वागत करती और फूलों को पानी देती थी।",
        Marathi: "एके काळी लिली नावाची एक गोड राजकुमारी होती. ती सुंदर फुले आणि जादुई झाडांनी वेढलेल्या राज्यात राहत होती. लिलीला सर्वांना मदत करायला आवडत असे. दररोज सकाळी ती पक्ष्यांना नमस्कार करत आणि बागेतील फुलांना पाणी देत असे."
      },
      {
        title: "A Magical Discovery",
        English: "One sunny morning, Lily saw a beautiful butterfly sitting on a rose. Its golden wings were shining like little stars. The butterfly flew around Lily and showed her a secret path behind the garden. Lily felt excited and decided to follow it.",
        Hindi: "एक सुंदर सुबह लिली ने गुलाब पर बैठी एक प्यारी तितली देखी। उसके सुनहरे पंख छोटे तारों की तरह चमक रहे थे। तितली लिली के चारों ओर उड़ने लगी और उसे बगीचे के पीछे एक गुप्त रास्ता दिखाया। लिली बहुत खुश हुई और उसके पीछे चल पड़ी।",
        Marathi: "एका सुंदर सकाळी लिलीला गुलाबावर बसलेले एक सुंदर फुलपाखरू दिसले. त्याचे सोनेरी पंख छोट्या ताऱ्यांसारखे चमकत होते. फुलपाखरू लिलीभोवती फिरू लागले आणि तिला बागेमागचा एक गुप्त रस्ता दाखवला. लिलीला खूप आनंद झाला आणि ती त्याच्या मागे गेली."
      },
      {
        title: "The Enchanted Forest",
        English: "Lily entered a magical forest filled with colorful flowers and tall trees. She met talking birds, friendly rabbits, and a tiny squirrel. The animals welcomed her warmly. They told Lily that a little lion had lost his way and needed help.",
        Hindi: "लिली एक जादुई जंगल में पहुँची। वहाँ रंग-बिरंगे फूल और ऊँचे पेड़ थे। उसे बोलने वाले पक्षी, प्यारे खरगोश और एक छोटी गिलहरी मिली। सभी ने उसका स्वागत किया। उन्होंने बताया कि एक छोटा शेर रास्ता भूल गया है और उसे मदद चाहिए।",
        Marathi: "लिली एका जादुई जंगलात पोहोचली. तिथे रंगीबेरंगी फुले आणि उंच झाडे होती. तिला बोलणारे पक्षी, गोड ससे आणि एक छोटी खार भेटली. सर्वांनी तिचे स्वागत केले. त्यांनी सांगितले की एक छोटा सिंह रस्ता चुकला आहे आणि त्याला मदतीची गरज आहे."
      },
      {
        title: "A Brave Little Hero",
        English: "Lily heard a soft crying sound near a big tree. She found a little lion hiding behind a bush. He was scared because he could not find his family. Lily smiled and promised to help him. Together, they followed the animal footprints through the forest.",
        Hindi: "लिली को एक बड़े पेड़ के पास रोने की आवाज़ सुनाई दी। उसे झाड़ी के पीछे एक छोटा शेर मिला। वह डर गया था क्योंकि उसे अपना परिवार नहीं मिल रहा था। लिली ने मुस्कुराकर उसकी मदद करने का वादा किया। दोनों जंगल में पैरों के निशान देखते हुए आगे बढ़े।",
        Marathi: "लिलीला एका मोठ्या झाडाजवळ रडण्याचा आवाज आला. तिला झुडपामागे एक छोटा सिंह दिसला. तो घाबरला होता कारण त्याला त्याचे कुटुंब सापडत नव्हते. लिलीने हसून त्याला मदत करण्याचे वचन दिले. दोघेही जंगलातील पावलांच्या खुणा पाहत पुढे गेले."
      },
      {
        title: "The Happy Reunion",
        English: "After walking for some time, Lily and the little lion heard a familiar roar. His family was waiting near a beautiful waterfall. The little lion ran happily towards them. His mother thanked Lily for her kindness. Everyone celebrated with a joyful dance.",
        Hindi: "कुछ देर चलने के बाद लिली और छोटे शेर को एक परिचित दहाड़ सुनाई दी। उसका परिवार सुंदर झरने के पास इंतज़ार कर रहा था। छोटा शेर खुशी से उनकी ओर दौड़ा। उसकी माँ ने लिली को धन्यवाद दिया। सभी ने खुशी से नाचकर जश्न मनाया।",
        Marathi: "थोडा वेळ चालल्यानंतर लिली आणि छोट्या सिंहाला ओळखीची डरकाळी ऐकू आली. त्याचे कुटुंब सुंदर धबधब्याजवळ त्याची वाट पाहत होते. छोटा सिंह आनंदाने त्यांच्याकडे धावला. त्याच्या आईने लिलीचे आभार मानले. सर्वांनी आनंदाने नाचून उत्सव साजरा केला."
      },
      {
        title: "The Princess of Kindness",
        English: "Lily returned to her kingdom as a happy princess. She shared her adventure with everyone. From that day, she helped people, animals, and friends. Everyone loved her because she was kind and brave. Lily learned that the greatest magic is a kind heart.",
        Hindi: "लिली खुशी-खुशी अपने राज्य लौट आई। उसने अपना रोमांचक सफर सबको बताया। वह सभी की मदद करने लगी। सभी उससे प्यार करते थे क्योंकि वह दयालु और बहादुर थी। लिली ने सीखा कि सबसे बड़ा जादू एक दयालु दिल है।",
        Marathi: "लिली आनंदाने आपल्या राज्यात परत आली. तिने सर्वांना तिच्या साहसाची गोष्ट सांगितली. ती सर्वांना मदत करू लागली. तिच्या दयाळू आणि धाडसी स्वभावामुळे सर्वजण तिच्यावर प्रेम करत होते. लिलीला समजले की सर्वात मोठी जादू म्हणजे प्रेमळ मन."
      }
    ]
  },

  2: {
    title: "The Friendly Jungle",
    category: "Jungle Adventure",
    pages: [
      {
        title: "Welcome to the Jungle",
        English: "In a green jungle lived Leo, a friendly little lion. He loved meeting new animals and making friends. Every morning, he played near the river and greeted all the animals. Leo always believed that everyone deserved a good friend.",
        Hindi: "हरे-भरे जंगल में लियो नाम का एक प्यारा शेर रहता था। उसे नए जानवरों से मिलना और दोस्त बनाना पसंद था। हर सुबह वह नदी के पास खेलता और सभी जानवरों का स्वागत करता था।",
        Marathi: "हिरव्यागार जंगलात लिओ नावाचा एक गोड सिंह राहत होता. त्याला नवीन प्राण्यांना भेटायला आणि मित्र बनवायला आवडत असे. दररोज सकाळी तो नदीजवळ खेळत असे आणि सर्व प्राण्यांना भेटत असे."
      },
      {
        title: "A New Friend",
        English: "One sunny day, Leo met Ellie the elephant. Ellie looked sad because she could not find her way to the river. Leo asked her what had happened. Ellie explained that she had wandered too far while looking for fresh leaves.",
        Hindi: "एक दिन लियो की मुलाकात एली हाथी से हुई। एली उदास थी क्योंकि उसे नदी का रास्ता नहीं मिल रहा था। लियो ने उससे पूछा कि क्या हुआ। एली ने बताया कि वह ताज़ी पत्तियाँ ढूँढते हुए बहुत दूर आ गई थी।",
        Marathi: "एका सुंदर दिवशी लिओला एली नावाची हत्तीण भेटली. एली उदास होती कारण तिला नदीचा रस्ता सापडत नव्हता. लिओने तिला काय झाले असे विचारले. तिने सांगितले की ताजी पाने शोधताना ती खूप दूर आली होती."
      },
      {
        title: "The Jungle Team",
        English: "A clever monkey named Momo and a colorful parrot joined them. Momo climbed a tall tree to look for the river. The parrot flew high above the forest. They decided to work together and find the safest path.",
        Hindi: "मोमो नाम का एक होशियार बंदर और रंगीन तोता उनके साथ आए। मोमो नदी का रास्ता देखने के लिए ऊँचे पेड़ पर चढ़ गया। तोता जंगल के ऊपर उड़ने लगा। सभी ने मिलकर रास्ता ढूँढने का फैसला किया।",
        Marathi: "मोमो नावाचे हुशार माकड आणि एक रंगीत पोपट त्यांच्यासोबत आले. मोमो नदी शोधण्यासाठी उंच झाडावर चढला. पोपट जंगलावरून उडू लागला. सर्वांनी मिळून सुरक्षित रस्ता शोधण्याचे ठरवले."
      },
      {
        title: "The Big Discovery",
        English: "The friends discovered a small path hidden behind the bushes. They followed it and soon heard the sound of flowing water. At last, they found the sparkling river. Ellie was very happy and thanked all her friends.",
        Hindi: "दोस्तों को झाड़ियों के पीछे एक छोटा रास्ता मिला। वे उस रास्ते पर चले और उन्हें पानी की आवाज़ सुनाई दी। आखिरकार उन्हें चमकती हुई नदी मिल गई। एली बहुत खुश हुई और उसने अपने दोस्तों को धन्यवाद दिया।",
        Marathi: "मित्रांना झुडपांमागे एक छोटा रस्ता सापडला. ते त्या रस्त्याने पुढे गेले आणि त्यांना पाण्याचा आवाज ऐकू आला. शेवटी त्यांना चमकणारी नदी सापडली. एली खूप आनंदी झाली आणि तिने मित्रांचे आभार मानले."
      },
      {
        title: "A Jungle Celebration",
        English: "All the jungle animals gathered near the river. They brought fruits, flowers, and sweet berries. Ellie shared her favorite fruits with everyone. The friends laughed and played together until the sun began to set.",
        Hindi: "जंगल के सभी जानवर नदी के पास इकट्ठा हुए। वे फल, फूल और मीठी बेरियाँ लाए। एली ने अपने पसंदीदा फल सभी के साथ बाँटे। सभी दोस्त सूर्यास्त तक हँसते और खेलते रहे।",
        Marathi: "जंगलातील सर्व प्राणी नदीजवळ एकत्र आले. त्यांनी फळे, फुले आणि गोड बेरी आणल्या. एलीने तिची आवडती फळे सर्वांसोबत वाटली. सूर्यास्त होईपर्यंत सर्व मित्र हसत आणि खेळत राहिले."
      },
      {
        title: "Friends Forever",
        English: "Leo, Ellie, Momo, and the parrot became the best of friends. They promised to help each other whenever someone needed them. Every day, they explored the jungle together. They learned that teamwork and friendship make every adventure special.",
        Hindi: "लियो, एली, मोमो और तोता अच्छे दोस्त बन गए। उन्होंने एक-दूसरे की मदद करने का वादा किया। वे हर दिन साथ में जंगल घूमते थे। उन्होंने सीखा कि दोस्ती और मिलकर काम करना हर साहस को खास बनाता है।",
        Marathi: "लिओ, एली, मोमो आणि पोपट खूप चांगले मित्र बनले. गरज पडल्यास एकमेकांना मदत करण्याचे त्यांनी ठरवले. ते रोज एकत्र जंगलात फिरत असत. मैत्री आणि एकत्र काम केल्याने प्रत्येक साहस खास बनते हे त्यांना समजले."
      }
    ]
  },

  3: {
    title: "Journey to the Stars",
    category: "Space Adventure",
    pages: [
      {
        title: "The Little Astronaut",
        English: "Mia loved looking at the stars. Every night, she sat near her bedroom window and imagined visiting the planets. She dreamed of exploring space in her own rocket. Her room was filled with pictures of stars and planets.",
        Hindi: "मिया को तारे देखना बहुत पसंद था। हर रात वह अपनी खिड़की के पास बैठकर ग्रहों पर जाने का सपना देखती थी। वह अपने रॉकेट में अंतरिक्ष घूमना चाहती थी।",
        Marathi: "मियाला तारे पाहायला खूप आवडत असे. दररोज रात्री ती खिडकीजवळ बसून ग्रहांवर जाण्याचे स्वप्न पाहत असे. तिला स्वतःच्या रॉकेटमधून अंतराळात जायचे होते."
      },
      {
        title: "Blast Off!",
        English: "One exciting night, Mia found a shiny little rocket in her garden. She climbed inside and fastened her seat belt. The countdown began: three, two, one! The rocket flew high into the sky, leaving a trail of sparkling light.",
        Hindi: "एक रोमांचक रात मिया को अपने बगीचे में एक चमकता हुआ रॉकेट मिला। वह उसमें बैठ गई और अपनी सीट बेल्ट बाँध ली। तीन, दो, एक! रॉकेट चमकती रोशनी के साथ आसमान में उड़ गया।",
        Marathi: "एका रोमांचक रात्री मियाला तिच्या बागेत एक चमकणारे रॉकेट दिसले. ती त्यात बसली आणि सीट बेल्ट लावली. तीन, दोन, एक! रॉकेट चमकदार प्रकाश सोडत आकाशात झेपावले."
      },
      {
        title: "A Colorful Planet",
        English: "Mia landed on a colorful planet filled with purple mountains and blue lakes. Friendly little aliens welcomed her with smiles. They showed her beautiful crystal caves and glowing flowers. Mia was amazed by everything she saw.",
        Hindi: "मिया एक रंगीन ग्रह पर पहुँची। वहाँ बैंगनी पहाड़ और नीली झीलें थीं। प्यारे एलियंस ने मुस्कुराकर उसका स्वागत किया। उन्होंने उसे सुंदर गुफाएँ और चमकते फूल दिखाए।",
        Marathi: "मिया एका रंगीत ग्रहावर उतरली. तिथे जांभळे पर्वत आणि निळे तलाव होते. छोट्या एलियन्सनी हसून तिचे स्वागत केले. त्यांनी तिला सुंदर गुहा आणि चमकणारी फुले दाखवली."
      },
      {
        title: "The Lost Star",
        English: "While exploring the planet, Mia found a tiny star hiding behind a rock. The star had fallen from the sky and could not find its way home. Mia promised to help. The friendly aliens showed her a special path leading to the sky bridge.",
        Hindi: "ग्रह पर घूमते समय मिया को एक छोटी तारा चट्टान के पीछे मिला। वह आसमान से गिर गया था और घर का रास्ता भूल गया था। मिया ने उसकी मदद करने का वादा किया।",
        Marathi: "ग्रहावर फिरताना मियाला एका खडकामागे छोटा तारा दिसला. तो आकाशातून खाली पडला होता आणि त्याला घरी जाण्याचा रस्ता सापडत नव्हता. मियाने त्याला मदत करण्याचे वचन दिले."
      },
      {
        title: "Back to the Sky",
        English: "Mia and her new friends climbed the sky bridge. At the top, the little star began to shine brighter and brighter. It floated gently into the sky and joined its family. The star twinkled happily to thank Mia.",
        Hindi: "मिया और उसके नए दोस्त आकाश के पुल पर चढ़े। ऊपर पहुँचकर छोटा तारा फिर से चमकने लगा। वह धीरे-धीरे आसमान में जाकर अपने परिवार से मिल गया।",
        Marathi: "मिया आणि तिचे नवीन मित्र आकाशाच्या पुलावर चढले. वर पोहोचल्यावर छोटा तारा पुन्हा चमकू लागला. तो हळूहळू आकाशात गेला आणि आपल्या कुटुंबाला भेटला."
      },
      {
        title: "A Dream Come True",
        English: "Mia returned home with wonderful memories of her space adventure. She looked at the stars from her bedroom window and smiled. She learned that curiosity, courage, and helping others make every journey special. One day, she hoped to become a real astronaut.",
        Hindi: "मिया अपने अंतरिक्ष सफर की सुंदर यादों के साथ घर लौट आई। उसने सीखा कि जिज्ञासा, साहस और दूसरों की मदद हर सफर को खास बनाते हैं। उसने एक दिन अंतरिक्ष यात्री बनने का सपना देखा।",
        Marathi: "मिया अंतराळातील सुंदर आठवणी घेऊन घरी परतली. तिने शिकले की जिज्ञासा, धैर्य आणि इतरांना मदत केल्याने प्रत्येक प्रवास खास बनतो. तिने एक दिवस खरी अंतराळवीर होण्याचे स्वप्न पाहिले."
      }
    ]
  },

  4: {
    title: "The Little Fairy",
    category: "Magic & Fairy Tales",
    pages: [
      {
        title: "The Tiny Fairy",
        English: "In a magical garden lived a tiny fairy named Bella. She had sparkling wings and a little magic wand. Bella loved helping flowers grow and making butterflies happy. Every creature in the garden loved her.",
        Hindi: "एक जादुई बगीचे में बेला नाम की एक छोटी परी रहती थी। उसके चमकते पंख और एक जादुई छड़ी थी। उसे फूलों और तितलियों की मदद करना पसंद था।",
        Marathi: "एका जादुई बागेत बेला नावाची छोटी परी राहत होती. तिचे पंख चमकत होते आणि तिच्याकडे जादूची कांडी होती. तिला फुलांना आणि फुलपाखरांना मदत करायला आवडत असे."
      },
      {
        title: "A Sad Flower",
        English: "One morning, Bella found a little flower sitting sadly near a stone. The flower had lost all its beautiful colors. Bella asked what had happened. The flower explained that it had not received sunlight for many days.",
        Hindi: "एक सुबह बेला को पत्थर के पास एक उदास फूल मिला। उसके सारे सुंदर रंग खो गए थे। बेला ने पूछा कि क्या हुआ। फूल ने बताया कि उसे कई दिनों से धूप नहीं मिली थी।",
        Marathi: "एका सकाळी बेलाला दगडाजवळ एक उदास फूल दिसले. त्याचे सर्व सुंदर रंग हरवले होते. बेलाने त्याला काय झाले असे विचारले. अनेक दिवस सूर्यप्रकाश न मिळाल्याचे फुलाने सांगितले."
      },
      {
        title: "A Magical Idea",
        English: "Bella wanted to help the flower. She asked the butterflies and bees to bring tiny drops of morning dew. She collected golden sunlight with her magic wand. Everyone worked together to bring happiness back to the little flower.",
        Hindi: "बेला फूल की मदद करना चाहती थी। उसने तितलियों और मधुमक्खियों से ओस की बूँदें लाने को कहा। उसने अपनी जादुई छड़ी से सुनहरी धूप इकट्ठी की।",
        Marathi: "बेलाला त्या फुलाची मदत करायची होती. तिने फुलपाखरे आणि मधमाशांना दवाचे थेंब आणायला सांगितले. तिने आपल्या जादूच्या कांडीने सोनेरी सूर्यप्रकाश गोळा केला."
      },
      {
        title: "The Colors Return",
        English: "Bella gently sprinkled the magical drops on the flower. Slowly, its petals became pink, yellow, and purple again. The flower stood tall and smiled. The butterflies danced around it with joy.",
        Hindi: "बेला ने धीरे से जादुई बूँदें फूल पर छिड़कीं। धीरे-धीरे उसकी पंखुड़ियाँ फिर से गुलाबी, पीली और बैंगनी हो गईं। फूल खुशी से खिल उठा।",
        Marathi: "बेलाने हळूच जादुई थेंब फुलावर शिंपडले. हळूहळू त्याच्या पाकळ्या पुन्हा गुलाबी, पिवळ्या आणि जांभळ्या झाल्या. फूल आनंदाने फुलले."
      },
      {
        title: "A Garden of Happiness",
        English: "All the flowers in the garden began to bloom. The bees collected sweet nectar and the butterflies danced in the sunshine. Bella felt happy because everyone had worked together. The garden became more beautiful than ever.",
        Hindi: "बगीचे के सभी फूल खिलने लगे। मधुमक्खियाँ मीठा रस इकट्ठा करने लगीं और तितलियाँ धूप में नाचने लगीं। बेला बहुत खुश हुई।",
        Marathi: "बागेतील सर्व फुले उमलू लागली. मधमाशा गोड मध गोळा करू लागल्या आणि फुलपाखरे उन्हात नाचू लागली. सर्वांनी एकत्र काम केल्यामुळे बेला आनंदी झाली."
      },
      {
        title: "The Magic of Kindness",
        English: "Bella's garden became the most beautiful garden in the land. Every flower was colorful and every butterfly was happy. Bella smiled because she had helped everyone. She learned that kindness is the most beautiful magic of all.",
        Hindi: "बेला का बगीचा पूरे राज्य में सबसे सुंदर बन गया। सभी फूल रंगीन थे और तितलियाँ खुश थीं। बेला ने सीखा कि दयालुता सबसे सुंदर जादू है।",
        Marathi: "बेलाची बाग संपूर्ण राज्यातील सर्वात सुंदर बाग बनली. प्रत्येक फूल रंगीत होते आणि फुलपाखरे आनंदी होती. सर्वांना मदत केल्यामुळे बेला आनंदी झाली. दयाळूपणा हीच सर्वात सुंदर जादू आहे."
      }
    ]
  },

  5: {
    title: "Dino's New Friend",
    category: "Dinosaur World",
    pages: [
      {
        title: "A Little Dinosaur",
        English: "Dino was a little green dinosaur who lived in a beautiful valley. He loved eating fresh leaves and playing near the river. But sometimes he felt lonely because he did not have a friend to play with.",
        Hindi: "डिनो एक छोटा हरा डायनासोर था। वह एक सुंदर घाटी में रहता था। उसे ताज़ी पत्तियाँ खाना और नदी के पास खेलना पसंद था। लेकिन उसके पास खेलने के लिए कोई दोस्त नहीं था।",
        Marathi: "डिनो एक छोटा हिरवा डायनासोर होता. तो एका सुंदर दरीत राहत होता. त्याला ताजी पाने खायला आणि नदीजवळ खेळायला आवडत असे. पण त्याला खेळण्यासाठी मित्र नव्हता."
      },
      {
        title: "A Strange Sound",
        English: "One sunny day, Dino was walking through the forest when he heard a tiny sound behind a big tree. He stopped and listened carefully. The sound came again. Dino became curious and slowly walked closer.",
        Hindi: "एक दिन डिनो जंगल में घूम रहा था। तभी उसे एक बड़े पेड़ के पीछे से छोटी सी आवाज़ सुनाई दी। वह रुका और ध्यान से सुनने लगा। डिनो धीरे-धीरे उस पेड़ के पास गया।",
        Marathi: "एका दिवशी डिनो जंगलात फिरत होता. तेव्हा त्याला मोठ्या झाडामागून एक छोटासा आवाज ऐकू आला. तो थांबला आणि काळजीपूर्वक ऐकू लागला. डिनो हळूहळू झाडाजवळ गेला."
      },
      {
        title: "A Shy Friend",
        English: "Behind the tree, Dino found a tiny baby dinosaur. The little dinosaur was hiding because he was shy. Dino smiled and introduced himself. He asked if the little dinosaur wanted to play together.",
        Hindi: "पेड़ के पीछे डिनो को एक छोटा डायनासोर मिला। वह शर्म के कारण छिपा हुआ था। डिनो मुस्कुराया और अपना परिचय दिया। उसने साथ खेलने के लिए पूछा।",
        Marathi: "झाडामागे डिनोला एक छोटा डायनासोर दिसला. तो लाजाळू असल्यामुळे लपला होता. डिनोने हसून स्वतःची ओळख करून दिली आणि त्याला एकत्र खेळायचे का असे विचारले."
      },
      {
        title: "Playing Together",
        English: "The baby dinosaur slowly came out. Dino showed him his favorite games. They played hide and seek, ran around the trees, and splashed water near the river. Soon, the little dinosaur was laughing happily.",
        Hindi: "छोटा डायनासोर धीरे-धीरे बाहर आया। डिनो ने उसे अपने पसंदीदा खेल दिखाए। दोनों ने लुका-छिपी खेली और नदी के पास पानी में मस्ती की।",
        Marathi: "छोटा डायनासोर हळूहळू बाहेर आला. डिनोने त्याला आपले आवडते खेळ दाखवले. दोघांनी लपाछपी खेळली आणि नदीजवळ पाण्यात मजा केली."
      },
      {
        title: "A Wonderful Adventure",
        English: "The two friends decided to explore the valley. They found colorful butterflies, juicy fruits, and a beautiful waterfall. When the baby dinosaur became tired, Dino shared his food and helped him rest under a tree.",
        Hindi: "दोनों दोस्तों ने घाटी घूमने का फैसला किया। उन्हें रंगीन तितलियाँ, मीठे फल और सुंदर झरना मिला। जब छोटा डायनासोर थक गया, तो डिनो ने अपना खाना उसके साथ बाँटा।",
        Marathi: "दोन्ही मित्रांनी दरीत फिरण्याचे ठरवले. त्यांना रंगीत फुलपाखरे, गोड फळे आणि सुंदर धबधबा दिसला. छोटा डायनासोर थकल्यावर डिनोने त्याच्यासोबत आपले खाणे वाटून घेतले."
      },
      {
        title: "Best Friends Forever",
        English: "Dino and his new friend played together every day. They shared food, explored the forest, and helped other little dinosaurs. Dino was happy that he had said hello that day. He learned that a little kindness can create a big friendship.",
        Hindi: "डिनो और उसका नया दोस्त हर दिन साथ खेलते थे। वे खाना बाँटते और जंगल घूमते थे। डिनो खुश था कि उसने उस दिन दोस्त को नमस्ते कहा था। उसने सीखा कि छोटी सी दयालुता बड़ी दोस्ती बना सकती है।",
        Marathi: "डिनो आणि त्याचा नवीन मित्र रोज एकत्र खेळू लागले. ते जेवण वाटून खात आणि जंगलात फिरत असत. त्या दिवशी आपण मित्राला नमस्कार केला याचा डिनोला आनंद झाला. छोटासा प्रेमळ प्रयत्न मोठी मैत्री निर्माण करू शकतो."
      }
    ]
  },

  6: {
    title: "The Sleepy Moon",
    category: "Bedtime Stories",
    pages: [
      {
        title: "A Sleepy Moon",
        English: "High in the sky lived a sleepy little moon. Every night, it watched over the world. It loved seeing children playing during the day and sleeping peacefully at night. The moon always smiled at the beautiful world below.",
        Hindi: "आसमान में एक प्यारा सा चाँद रहता था। हर रात वह दुनिया को देखता था। उसे बच्चों को खेलते और रात में शांति से सोते देखना पसंद था।",
        Marathi: "आकाशात एक गोड चंद्र राहत होता. प्रत्येक रात्री तो संपूर्ण जगाकडे पाहत असे. मुलांना दिवसा खेळताना आणि रात्री शांत झोपताना पाहून त्याला आनंद होत असे."
      },
      {
        title: "The Twinkling Stars",
        English: "One night, the little stars danced around the moon. They filled the sky with sparkling light. The moon laughed softly and asked the stars to sing a gentle bedtime song for all the sleeping children.",
        Hindi: "एक रात छोटे तारे चाँद के चारों ओर नाचने लगे। उन्होंने आसमान को चमकदार रोशनी से भर दिया। चाँद ने उनसे बच्चों के लिए प्यारा सा गीत गाने को कहा।",
        Marathi: "एका रात्री छोटे तारे चंद्राभोवती नाचू लागले. त्यांनी आकाश चमकदार प्रकाशाने भरून टाकले. चंद्राने त्यांना झोपलेल्या मुलांसाठी गोड गाणे म्हणायला सांगितले."
      },
      {
        title: "A Gentle Cloud",
        English: "A soft white cloud floated near the moon. It noticed that the moon looked tired. The cloud offered its fluffy side as a pillow. The moon thanked the cloud and rested its head comfortably.",
        Hindi: "एक मुलायम सफेद बादल चाँद के पास आया। उसने देखा कि चाँद थका हुआ था। बादल ने उसे अपना मुलायम हिस्सा तकिए की तरह दिया। चाँद ने धन्यवाद कहा।",
        Marathi: "एक मऊ पांढरा ढग चंद्राजवळ आला. चंद्र थकलेला दिसत होता. ढगाने त्याला आपला मऊ भाग उशी म्हणून दिला. चंद्राने ढगाचे आभार मानले."
      },
      {
        title: "A Little Dream",
        English: "As the moon rested, it dreamed of a peaceful world. It saw children sleeping in cozy beds, little animals resting in their homes, and flowers closing their petals for the night. Everything was calm and beautiful.",
        Hindi: "आराम करते समय चाँद ने एक शांत दुनिया का सपना देखा। उसने बच्चों को आरामदायक बिस्तरों में सोते, जानवरों को अपने घरों में आराम करते और फूलों को रात में बंद होते देखा।",
        Marathi: "विश्रांती घेताना चंद्राने एका शांत जगाचे स्वप्न पाहिले. त्याने मुलांना आरामदायक अंथरुणात झोपलेले, प्राण्यांना घरात विसावलेले आणि फुलांना पाकळ्या मिटताना पाहिले."
      },
      {
        title: "Sweet Dreams",
        English: "The moon sent tiny silver dreams to every sleeping child. Some children dreamed of flying with butterflies. Others dreamed of magical castles and friendly animals. The stars watched over everyone with their gentle light.",
        Hindi: "चाँद ने हर सोते हुए बच्चे को छोटे-छोटे सुंदर सपने भेजे। कुछ बच्चों ने तितलियों के साथ उड़ने का सपना देखा। कुछ ने जादुई महलों और प्यारे जानवरों के सपने देखे।",
        Marathi: "चंद्राने प्रत्येक झोपलेल्या मुलाला सुंदर स्वप्ने पाठवली. काही मुलांनी फुलपाखरांसोबत उडण्याचे स्वप्न पाहिले. काहींनी जादुई किल्ले आणि गोड प्राण्यांची स्वप्ने पाहिली."
      },
      {
        title: "Good Night, Little One",
        English: "The moon rested on its fluffy cloud pillow. The stars twinkled softly, and the whole world became quiet. The moon whispered, 'Good night, little friends. May your dreams be full of happiness and magic.' Everyone slept peacefully.",
        Hindi: "चाँद अपने मुलायम बादल के तकिए पर आराम करने लगा। तारे धीरे-धीरे चमक रहे थे। चाँद ने कहा, 'शुभ रात्रि प्यारे दोस्तों। तुम्हारे सपने खुशियों और जादू से भरे हों।' सभी शांति से सो गए।",
        Marathi: "चंद्र मऊ ढगाच्या उशीवर विसावला. तारे हळूच चमकत होते आणि संपूर्ण जग शांत झाले. चंद्र म्हणाला, 'शुभ रात्री छोट्या मित्रांनो. तुमची स्वप्ने आनंदाने आणि जादूने भरलेली असोत.' सर्वजण शांत झोपी गेले."
      }
    ]
  }
};

function ReadStory() {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("normal");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const utteranceRef = useRef(null);

  const story = stories[id];

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentPage(0);
  }, [id]);

  const handleReadAloud = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support Read Aloud.");
      return;
    }

    stopSpeaking();

    const page = story?.pages[currentPage];

    if (!page) return;

    const languageSettings = {
      English: "en-IN",
      Hindi: "hi-IN",
      Marathi: "mr-IN",
    };

    const utterance = new SpeechSynthesisUtterance(
      `${page.title}. ${page[language]}`
    );

    utterance.lang = languageSettings[language];
    utterance.rate = 0.85;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!("speechSynthesis" in window)) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    stopSpeaking();
  };

  if (!story) {
    return (
      <div className="read-story-page">
        <h2>Story Not Found</h2>
        <Link to="/stories">Back to Stories</Link>
      </div>
    );
  }

  const page = story.pages[currentPage];

  const handleLanguageChange = (value) => {
    stopSpeaking();
    setLanguage(value);
  };

  const handlePrevious = () => {
    stopSpeaking();
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    stopSpeaking();
    setCurrentPage((prev) =>
      Math.min(story.pages.length - 1, prev + 1)
    );
  };

  return (
    <div className="read-story-page">

      <div className="reading-top">
        <Link
          to="/stories"
          className="back-to-stories"
          onClick={stopSpeaking}
        >
          Back to Stories
        </Link>

        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="story-language"
          aria-label="Choose story language"
        >
          <option value="English">English</option>
          <option value="Hindi">हिन्दी</option>
          <option value="Marathi">मराठी</option>
        </select>
      </div>

      <div className="reading-heading">
        <span>{story.category.toUpperCase()}</span>

        <h1>{story.title}</h1>

        <p>A beautiful adventure waiting just for you!</p>
      </div>

      <div className="reading-card">

        <div className="reading-font-controls">
          <span>Text Size:</span>

          <button
            type="button"
            className={fontSize === "small" ? "active" : ""}
            onClick={() => setFontSize("small")}
          >
            A−
          </button>

          <button
            type="button"
            className={fontSize === "normal" ? "active" : ""}
            onClick={() => setFontSize("normal")}
          >
            A
          </button>

          <button
            type="button"
            className={fontSize === "large" ? "active" : ""}
            onClick={() => setFontSize("large")}
          >
            A+
          </button>
        </div>

        {/* STORY IMAGE - NO EMOJI */}
        <div className="reading-illustration">
          <img
            src={storyImages[id]}
            alt={story.title}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="reading-content">
          <span className="reading-page-number">
            PAGE {currentPage + 1} OF {story.pages.length}
          </span>

          <h2>{page.title}</h2>

          <p className={`story-text ${fontSize}`}>
            {page[language]}
          </p>
        </div>

        <div className="read-aloud-controls">

          <button
            type="button"
            className="read-aloud-button"
            onClick={handleReadAloud}
          >
            Read Aloud
          </button>

          <button
            type="button"
            className="audio-secondary-button"
            onClick={handlePauseResume}
            disabled={!isSpeaking}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button
            type="button"
            className="audio-secondary-button"
            onClick={handleStop}
            disabled={!isSpeaking && !isPaused}
          >
            Stop
          </button>

        </div>

        <p className="audio-language-note">
          Audio Language: {language}
          <br />
          Available voices depend on your browser and device.
        </p>

        <div
          className="reading-progress"
          role="progressbar"
          aria-valuenow={currentPage + 1}
          aria-valuemin={1}
          aria-valuemax={story.pages.length}
        >
          <div
            className="reading-progress-fill"
            style={{
              width: `${
                ((currentPage + 1) / story.pages.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="reading-controls">

          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Previous
          </button>

          <span>
            {currentPage + 1} / {story.pages.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === story.pages.length - 1}
          >
            Next Page
          </button>

        </div>

        {currentPage === story.pages.length - 1 && (
          <div className="story-complete">
            You completed the story!
            Great job, little reader!

            <br />

            <Link
              to="/stories"
              onClick={stopSpeaking}
            >
              Read Another Story
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default ReadStory;
