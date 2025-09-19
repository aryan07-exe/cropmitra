 import React, { useState, useEffect, useRef } from 'react';
 import { Bar } from 'react-chartjs-2';
 import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';
 
 // Register Chart.js components
 ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
 );
 
 // Translation data (kept outside the component to prevent re-declaration on re-renders)
 const translations = {
     en: { home: 'Home', input: 'Input', dashboard: 'Dashboard', knowledge: 'Knowledge Hub', contact: 'Contact', home_title: 'AI-Powered Crop Yield Prediction', home_description_1: 'Welcome to **Crop Mitra**, your intelligent partner in farming. Our platform leverages the power of AI to provide accurate crop yield predictions, helping you make informed decisions for a more productive harvest.', home_description_2: "By analyzing key factors like soil type, farm size, and weather patterns, we empower farmers with data-driven insights to maximize their yield and optimize resource usage. Let's grow together!", home_button: 'Get Started', input_title: 'Enter Farm Details', form_label_location: 'Farm Location', form_button_gps: 'Use GPS', form_label_size: 'Farm Size', unit_acres: 'Acres', unit_hectares: 'Hectares', unit_sq_m: 'Sq. Meters', form_label_soil_known: 'Do you know the soil type?', form_label_yes: 'Yes', form_label_no: 'No', form_label_soil_type: 'Soil Type', form_label_soil_color: 'Soil Color', form_label_absorption: 'Absorption Rate', form_option_select: 'Select...', soil_clay: 'Clay', soil_sandy: 'Sandy', soil_loamy: 'Loamy', soil_silty: 'Silty', soil_chalky: 'Chalky', soil_peaty: 'Peaty', color_black: 'Black', color_brown: 'Brown', color_red: 'Red', color_yellow: 'Yellow', color_grey: 'Grey', rate_high: 'High', rate_medium: 'Medium', rate_low: 'Low', form_label_seed: 'Seed Type / Crop', form_label_date: 'Sowing Date', form_label_irrigation: 'Irrigation Method', method_drip: 'Drip Irrigation', method_sprinkler: 'Sprinkler Irrigation', method_flood: 'Flood Irrigation', form_button_predict: 'Predict Yield', dashboard_title: 'Prediction Dashboard', yield_heading: 'Expected Yield', yield_unit: 'kg', tips_heading: 'Resource Optimization Tips', tip_1: 'Use organic fertilizers to improve soil health.', tip_2: 'Install a drip irrigation system to save water.', tip_3: 'Monitor local weather forecasts for timely actions.', analysis_heading: 'Yield Analysis Graph', knowledge_title: 'Knowledge Hub', kh_card1_title: 'Understanding Soil Health', kh_card1_text: 'Healthy soil is the foundation of a good harvest. Soil health refers to its ability to function as a living ecosystem to sustain plants, animals, and humans. Factors like soil type, pH levels, and nutrient content are crucial. Regular soil testing helps identify deficiencies and enables targeted fertilization.', kh_card2_title: 'The Importance of Timely Sowing', kh_card2_text: 'Sowing your seeds at the right time is critical for optimal growth. The ideal sowing date depends on local climate, crop type, and soil conditions. Sowing too early or too late can expose young plants to unfavorable weather, pests, or diseases, reducing the overall yield.', kh_card3_title: 'Efficient Irrigation Methods', kh_card3_text: 'Choosing the right irrigation method can significantly save water and improve crop productivity. **Drip irrigation** delivers water directly to the plant roots, minimizing waste. **Sprinkler systems** are efficient for larger fields, while **flood irrigation** is a traditional but water-intensive method.', contact_title: 'Contact Us', contact_info_text: 'For any queries, please reach out to **Team Crop Mitra**.', contact_email_label: 'Email:', contact_phone_label: 'Phone:', chatbot_button: 'Chat with Mitra', chatbot_header_text: 'Crop Mitra Chatbot', chatbot_input_placeholder: 'Type your message...', chatbot_send: 'Send', bot_welcome: 'Hello! How can I help you with your farming today?', bot_response_yield: 'Our AI analyzes your farm data to provide a yield prediction. Please fill out the form on the "Input" page.', bot_response_soil: 'Soil type is crucial for your crop. Knowing it helps our AI provide a more accurate prediction. You can find out by getting a soil test or by observing its color and absorption rate.', bot_response_contact: 'You can contact us via email at contact@cropmitra.com or by phone at +91-1234567890.', bot_response_irrigation: 'Efficient irrigation methods save water and improve crop health. Common methods include Drip, Sprinkler, and Flood irrigation.', bot_response_default: 'I am a simple chatbot for this prototype. I can answer questions about yield prediction, soil, and contact details. Try asking about "yield," "soil," or "contact."', },
     hi: { home: 'होम', input: 'इनपुट', dashboard: 'डैशबोर्ड', knowledge: 'ज्ञान केंद्र', contact: 'संपर्क करें', home_title: 'एआई-संचालित फसल उपज पूर्वानुमान', home_description_1: '**फसल मित्र** में आपका स्वागत है, खेती में आपका बुद्धिमान साथी। हमारा मंच सटीक फसल उपज का पूर्वानुमान प्रदान करने के लिए एआई की शक्ति का लाभ उठाता है, जिससे आपको अधिक उत्पादक फसल के लिए सूचित निर्णय लेने में मदद मिलती है।', home_description_2: 'मिट्टी के प्रकार, खेत के आकार और मौसम के पैटर्न जैसे प्रमुख कारकों का विश्लेषण करके, हम किसानों को अपनी उपज को अधिकतम करने और संसाधन उपयोग को अनुकूलित करने के लिए डेटा-संचालित अंतर्दृष्टि के साथ सशक्त बनाते हैं। आइए मिलकर बढ़ें!', home_button: 'शुरू करें', input_title: 'खेत का विवरण दर्ज करें', form_label_location: 'खेत का स्थान', form_button_gps: 'जीपीएस का उपयोग करें', form_label_size: 'खेत का आकार', unit_acres: 'एकड़', unit_hectares: 'हेक्टेयर', unit_sq_m: 'वर्ग मीटर', form_label_soil_known: 'क्या आप मिट्टी का प्रकार जानते हैं?', form_label_yes: 'हाँ', form_label_no: 'नहीं', form_label_soil_type: 'मिट्टी का प्रकार', form_label_soil_color: 'मिट्टी का रंग', form_label_absorption: 'अवशोषण दर', form_option_select: 'चुनें...', soil_clay: 'क्ले', soil_sandy: 'रेतीली', soil_loamy: 'लोमी', soil_silty: 'सिल्टी', soil_chalky: 'चाकी', soil_peaty: 'पीटी', color_black: 'काला', color_brown: 'भूरा', color_red: 'लाल', color_yellow: 'पीला', color_grey: 'ग्रे', rate_high: 'उच्च', rate_medium: 'मध्यम', rate_low: 'निम्न', form_label_seed: 'बीज का प्रकार / फसल', form_label_date: 'बुवाई की तारीख', form_label_irrigation: 'सिंचाई विधि', method_drip: 'ड्रिप सिंचाई', method_sprinkler: 'स्प्रिंकलर सिंचाई', method_flood: 'फ्लड सिंचाई', form_button_predict: 'उपज का पूर्वानुमान करें', dashboard_title: 'पूर्वानुमान डैशबोर्ड', yield_heading: 'अनुमानित उपज', yield_unit: 'किलोग्राम', tips_heading: 'संसाधन अनुकूलन युक्तियाँ', tip_1: 'मिट्टी के स्वास्थ्य को बेहतर बनाने के लिए जैविक उर्वरकों का उपयोग करें।', tip_2: 'पानी बचाने के लिए ड्रिप सिंचाई प्रणाली स्थापित करें।', tip_3: 'समय पर कार्रवाई के लिए स्थानीय मौसम के पूर्वानुमान की निगरानी करें।', analysis_heading: 'उपज विश्लेषण ग्राफ', knowledge_title: 'ज्ञान केंद्र', kh_card1_title: 'मिट्टी के स्वास्थ्य को समझना', kh_card1_text: 'स्वस्थ मिट्टी एक अच्छी फसल की नींव है। मिट्टी का स्वास्थ्य पौधों, जानवरों और मनुष्यों को बनाए रखने के लिए एक जीवित पारिस्थितिकी तंत्र के रूप में कार्य करने की उसकी क्षमता को संदर्भित करता है। मिट्टी का प्रकार, पीएच स्तर और पोषक तत्व जैसे कारक महत्वपूर्ण हैं। नियमित मिट्टी परीक्षण कमियों की पहचान करने और लक्षित उर्वरकों को सक्षम करने में मदद करता है।', kh_card2_title: 'समय पर बुवाई का महत्व', kh_card2_text: 'इष्टतम विकास के लिए सही समय पर बीज बोना महत्वपूर्ण है। आदर्श बुवाई की तारीख स्थानीय जलवायु, फसल के प्रकार और मिट्टी की स्थितियों पर निर्भर करती है। बहुत जल्दी या बहुत देर से बुवाई करने से युवा पौधे प्रतिकूल मौसम, कीटों या बीमारियों के संपर्क में आ सकते हैं, जिससे समग्र उपज कम हो जाती है।', kh_card3_title: 'कुशल सिंचाई विधियाँ', kh_card3_text: 'सही सिंचाई विधि चुनने से पानी की बचत हो सकती है और फसल की उत्पादकता में सुधार हो सकता है। **ड्रिप सिंचाई** पानी को सीधे पौधे की जड़ों तक पहुंचाती है, जिससे पानी की बर्बादी कम होती है। **स्प्रिंकलर प्रणाली** बड़े खेतों के लिए कुशल है, जबकि **बाढ़ सिंचाई** एक पारंपरिक लेकिन पानी-गहन विधि है।', contact_title: 'संपर्क करें', contact_info_text: 'किसी भी प्रश्न के लिए, कृपया **टीम फसल मित्र** से संपर्क करें।', contact_email_label: 'ईमेल:', contact_phone_label: 'फ़ोन:', chatbot_button: 'मित्र से चैट करें', chatbot_header_text: 'फसल मित्र चैटबॉट', chatbot_input_placeholder: 'अपना संदेश टाइप करें...', chatbot_send: 'भेजें', bot_welcome: 'नमस्ते! मैं आज आपकी खेती में कैसे मदद कर सकता हूँ?', bot_response_yield: 'हमारा एआई उपज का पूर्वानुमान प्रदान करने के लिए आपके खेत के डेटा का विश्लेषण करता है। कृपया "इनपुट" पृष्ठ पर फॉर्म भरें।', bot_response_soil: 'आपकी फसल के लिए मिट्टी का प्रकार महत्वपूर्ण है। इसे जानने से हमारे एआई को अधिक सटीक पूर्वानुमान प्रदान करने में मदद मिलती है। आप मिट्टी का परीक्षण करवाकर या उसके रंग और अवशोषण दर का अवलोकन करके इसका पता लगा सकते हैं।', bot_response_contact: 'आप contact@cropmitra.com पर ईमेल के माध्यम से या +91-1234567890 पर फोन करके हमसे संपर्क कर सकते हैं।', bot_response_irrigation: 'कुशल सिंचाई विधियाँ पानी बचाती हैं और फसल के स्वास्थ्य में सुधार करती हैं। सामान्य तरीकों में ड्रिप, स्प्रिंकलर और फ्लड सिंचाई शामिल हैं।', bot_response_default: 'मैं इस प्रोटोटाइप के लिए एक साधारण चैटबॉट हूं। मैं उपज पूर्वानुमान, मिट्टी और संपर्क विवरण के बारे में सवालों के जवाब दे सकता हूं। "उपज," "मिट्टी," या "संपर्क" के बारे में पूछने का प्रयास करें।', },
     // ... Add other language translations here (ta, te, bn, mr, gu) for brevity
 };
 
 // Helper to parse text with markdown-style bolding (**text**)
 const ParseBold = ({ text }) => {
     if (!text) return null;
     const parts = text.split(/\*\*(.*?)\*\*/g);
     return (
         <>
             {parts.map((part, i) =>
                 i % 2 === 1 ? <strong key={i}>{part}</strong> : part
             )}
         </>
     );
 };
 
 const CropMitra = () => {
     // --- STATE MANAGEMENT ---
     const [activePage, setActivePage] = useState('home');
     const [language, setLanguage] = useState('en');
     
     // Form state
     const [formValues, setFormValues] = useState({
         location: '',
         farm_size: '',
         size_unit: 'acres',
         soil_known: 'yes',
         soil_type: '',
         soil_color: '',
         absorption_rate: '',
         seed_type: '',
         sowing_date: '',
         irrigation: ''
     });
     
     // Dashboard state
     const [predictedYield, setPredictedYield] = useState(0);
     const [chartData, setChartData] = useState(null);
 
     // Chatbot state
     const [isChatOpen, setIsChatOpen] = useState(false);
     const [chatInput, setChatInput] = useState('');
     const [chatMessages, setChatMessages] = useState([
         { sender: 'bot', key: 'bot_welcome' }
     ]);
 
     const chatMessagesEndRef = useRef(null);
     const t = translations[language]; // Shortcut for current translation
 
     // --- EFFECTS ---
     // Effect to scroll chat to the bottom
     useEffect(() => {
         chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, [chatMessages]);
 
     // --- HANDLERS ---
     const handleNavClick = (page) => (e) => {
         e.preventDefault();
         setActivePage(page);
     };
 
     const handleFormChange = (e) => {
         const { name, value } = e.target;
         setFormValues(prev => ({ ...prev, [name]: value }));
     };
 
     const handleGpsClick = () => {
         if ("geolocation" in navigator) {
             navigator.geolocation.getCurrentPosition(
                 (position) => {
                     alert(`GPS Location: Lat ${position.coords.latitude}, Lon ${position.coords.longitude}`);
                     setFormValues(prev => ({ ...prev, location: 'Fetched via GPS' }));
                 },
                 (error) => {
                     alert('Error getting location. Please enter manually.');
                     console.error('Geolocation Error:', error);
                 }
             );
         } else {
             alert('Geolocation is not supported by your browser.');
         }
     };
 
     const handleFormSubmit = (e) => {
         e.preventDefault();
         const randomYield = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
         setPredictedYield(randomYield);
 
         const newChartData = {
             labels: ['Soil Type', 'Sowing Date', 'Irrigation', 'Expected'],
             datasets: [{
                 label: 'Analysis',
                 data: [
                     Math.floor(Math.random() * 80) + 20,
                     Math.floor(Math.random() * 80) + 20,
                     Math.floor(Math.random() * 80) + 20,
                     randomYield / 20
                 ],
                 backgroundColor: [
                     'rgba(75, 192, 192, 0.6)',
                     'rgba(153, 102, 255, 0.6)',
                     'rgba(255, 159, 64, 0.6)',
                     'rgba(76, 175, 80, 1)'
                 ],
                 borderColor: [
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)',
                     'rgba(76, 175, 80, 1)'
                 ],
                 borderWidth: 1,
             }]
         };
         setChartData(newChartData);
         setActivePage('dashboard');
     };
 
     const getBotResponseKey = (userMessage) => {
         const lower = userMessage.toLowerCase();
         if (lower.includes('yield') || lower.includes('crop') || lower.includes('predict')) return 'bot_response_yield';
         if (lower.includes('soil')) return 'bot_response_soil';
         if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) return 'bot_response_contact';
         if (lower.includes('irrigation') || lower.includes('water')) return 'bot_response_irrigation';
         return 'bot_response_default';
     };
 
     const handleSendMessage = () => {
         if (chatInput.trim() === '') return;
         
         const newUserMessage = { sender: 'user', text: chatInput };
         setChatMessages(prev => [...prev, newUserMessage]);
         
         const botResponseKey = getBotResponseKey(chatInput);
 
         setTimeout(() => {
             const newBotMessage = { sender: 'bot', key: botResponseKey };
             setChatMessages(prev => [...prev, newBotMessage]);
         }, 1000);
 
         setChatInput('');
     };
 
     // --- RENDER LOGIC ---
     const chartOptions = {
         responsive: true,
         scales: { y: { beginAtZero: true, display: false } },
         plugins: { legend: { display: false } }
     };
 
     // Helper to render sections
     const renderSection = () => {
         switch (activePage) {
             case 'input': return <InputSection />;
             case 'dashboard': return <DashboardSection />;
             case 'knowledge': return <KnowledgeHubSection />;
             case 'contact': return <ContactSection />;
             case 'home':
             default: return <HomeSection />;
         }
     };
     
     // --- SUB-COMPONENTS for Sections ---
 
     const HomeSection = () => (
         <section style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594955375416-d3c544d6731d')" }} className="bg-cover bg-center text-white flex items-center justify-center text-center p-8 md:p-40 min-h-[calc(100vh-80px)]">
             <div className="bg-black bg-opacity-40 p-8 rounded-lg">
                 <h1 className="text-5xl font-bold mb-4">{t.home_title}</h1>
                 <p className="text-xl max-w-3xl mx-auto mb-8"><ParseBold text={t.home_description_1} /></p>
                 <p className="text-xl max-w-3xl mx-auto mb-8">{t.home_description_2}</p>
                 <a href="#input" onClick={handleNavClick('input')} className="inline-block bg-primary-green text-white py-4 px-8 rounded-md font-semibold transition hover:bg-dark-green">{t.home_button}</a>
             </div>
         </section>
     );
 
     const InputSection = () => (
         <section className="p-8 md:p-16">
             <h2 className="text-3xl font-bold mb-8">{t.input_title}</h2>
             <form onSubmit={handleFormSubmit}>
                 {/* Location */}
                 <div className="mb-6">
                     <label htmlFor="location" className="block font-semibold mb-2">{t.form_label_location}</label>
                     <div className="flex gap-2">
                         <input type="text" id="location" name="location" value={formValues.location} onChange={handleFormChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                         <button type="button" onClick={handleGpsClick} className="p-3 bg-primary-green text-white rounded-md font-semibold whitespace-nowrap hover:bg-dark-green">{t.form_button_gps}</button>
                     </div>
                 </div>
                 {/* Farm Size */}
                 <div className="mb-6">
                      <label htmlFor="farm_size" className="block font-semibold mb-2">{t.form_label_size}</label>
                      <div className="flex gap-2">
                         <input type="number" id="farm_size" name="farm_size" min="0" value={formValues.farm_size} onChange={handleFormChange} required className="flex-grow p-3 border border-gray-300 rounded-md" />
                         <select id="size_unit" name="size_unit" value={formValues.size_unit} onChange={handleFormChange} className="p-3 border border-gray-300 rounded-md">
                             <option value="acres">{t.unit_acres}</option>
                             <option value="hectares">{t.unit_hectares}</option>
                             <option value="sq_m">{t.unit_sq_m}</option>
                         </select>
                     </div>
                 </div>
                 {/* Soil Known Radio */}
                  <div className="mb-6">
                     <label className="block font-semibold mb-2">{t.form_label_soil_known}</label>
                     <div className="flex gap-6">
                         <label className="inline-flex items-center"><input type="radio" name="soil_known" value="yes" checked={formValues.soil_known === 'yes'} onChange={handleFormChange} className="mr-2"/>{t.form_label_yes}</label>
                         <label className="inline-flex items-center"><input type="radio" name="soil_known" value="no" checked={formValues.soil_known === 'no'} onChange={handleFormChange} className="mr-2"/>{t.form_label_no}</label>
                     </div>
                 </div>
                 {/* Soil Fields */}
                 {formValues.soil_known === 'yes' ? (
                     <div className="mb-6">
                         <label htmlFor="soil_type" className="block font-semibold mb-2">{t.form_label_soil_type}</label>
                         <select id="soil_type" name="soil_type" value={formValues.soil_type} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-md">
                             <option value="">{t.form_option_select}</option>
                             <option value="clay">{t.soil_clay}</option>
                             <option value="sandy">{t.soil_sandy}</option>
                             {/* ... more options */}
                         </select>
                     </div>
                 ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                         <div>
                            <label htmlFor="soil_color" className="block font-semibold mb-2">{t.form_label_soil_color}</label>
                            <select id="soil_color" name="soil_color" value={formValues.soil_color} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">{t.form_option_select}</option>
                                <option value="black">{t.color_black}</option>
                                {/* ... more options */}
                            </select>
                         </div>
                         <div>
                            <label htmlFor="absorption_rate" className="block font-semibold mb-2">{t.form_label_absorption}</label>
                            <select id="absorption_rate" name="absorption_rate" value={formValues.absorption_rate} onChange={handleFormChange} className="w-full p-3 border border-gray-300 rounded-md">
                                 <option value="">{t.form_option_select}</option>
                                 <option value="high">{t.rate_high}</option>
                                 {/* ... more options */}
                            </select>
                         </div>
                     </div>
                 )}
                 {/* Other Fields */}
                 <div className="mb-6">
                     <label htmlFor="seed_type" className="block font-semibold mb-2">{t.form_label_seed}</label>
                     <input type="text" id="seed_type" name="seed_type" value={formValues.seed_type} onChange={handleFormChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                 </div>
                  <div className="mb-6">
                     <label htmlFor="sowing_date" className="block font-semibold mb-2">{t.form_label_date}</label>
                     <input type="date" id="sowing_date" name="sowing_date" value={formValues.sowing_date} onChange={handleFormChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                 </div>
                 <div className="mb-8">
                     <label htmlFor="irrigation" className="block font-semibold mb-2">{t.form_label_irrigation}</label>
                     <select id="irrigation" name="irrigation" value={formValues.irrigation} onChange={handleFormChange} required className="w-full p-3 border border-gray-300 rounded-md">
                         <option value="">{t.form_option_select}</option>
                         <option value="drip">{t.method_drip}</option>
                         {/* ... more options */}
                     </select>
                 </div>
                 <button type="submit" className="w-full p-3 bg-primary-green text-white rounded-md font-semibold text-lg hover:bg-dark-green">{t.form_button_predict}</button>
             </form>
         </section>
     );
 
     const DashboardSection = () => (
         <section className="p-8 md:p-16 text-center bg-light-green">
             <h2 className="text-3xl font-bold mb-8">{t.dashboard_title}</h2>
             {predictedYield > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="bg-white p-6 rounded-lg shadow-md">
                         <h3 className="text-xl text-dark-green font-semibold">{t.yield_heading}</h3>
                         <p className="text-5xl font-bold text-primary-green my-2">{predictedYield} <span className="text-3xl">{t.yield_unit}</span></p>
                     </div>
                     <div className="bg-white p-6 rounded-lg shadow-md text-left">
                         <h3 className="text-xl text-dark-green font-semibold">{t.tips_heading}</h3>
                         <ul className="list-disc list-inside mt-2 space-y-1">
                             <li>{t.tip_1}</li>
                             <li>{t.tip_2}</li>
                             <li>{t.tip_3}</li>
                         </ul>
                     </div>
                 </div>
             )}
             <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold mb-4">{t.analysis_heading}</h3>
                 {chartData ? <Bar data={chartData} options={chartOptions} /> : <p>Submit the form to see the analysis graph.</p>}
             </div>
         </section>
     );
     
     const KnowledgeHubSection = () => (
          <section className="p-8 md:p-16">
             <h2 className="text-3xl font-bold mb-8">{t.knowledge_title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-light-green p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
                     <h3 className="text-xl text-dark-green font-semibold border-b-2 border-primary-green pb-2 mb-2">{t.kh_card1_title}</h3>
                     <p>{t.kh_card1_text}</p>
                 </div>
                  <div className="bg-light-green p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
                     <h3 className="text-xl text-dark-green font-semibold border-b-2 border-primary-green pb-2 mb-2">{t.kh_card2_title}</h3>
                     <p>{t.kh_card2_text}</p>
                 </div>
                  <div className="bg-light-green p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
                     <h3 className="text-xl text-dark-green font-semibold border-b-2 border-primary-green pb-2 mb-2">{t.kh_card3_title}</h3>
                     <p><ParseBold text={t.kh_card3_text} /></p>
                 </div>
             </div>
         </section>
     );
 
     const ContactSection = () => (
         <section className="p-8 md:p-16 text-center bg-light-green">
             <h2 className="text-3xl font-bold mb-8">{t.contact_title}</h2>
             <div className="max-w-2xl mx-auto">
                 <p className="mb-4 text-lg"><ParseBold text={t.contact_info_text} /></p>
                 <p className="mb-2"><strong>{t.contact_email_label}</strong> <a href="mailto:contact@cropmitra.com" className="text-primary-green hover:underline">contact@cropmitra.com</a></p>
                 <p><strong>{t.contact_phone_label}</strong> +91-1234567890</p>
             </div>
         </section>
     );
 
     // --- MAIN COMPONENT RENDER ---
     return (
         <div className="font-poppins bg-light-green text-gray-800">
             {/* Header */}
             <header className="bg-white shadow-md flex justify-between items-center p-4 fixed w-full top-0 left-0 z-50 flex-wrap md:px-8">
                 <div className="text-2xl font-semibold text-primary-green">Crop Mitra 🌱</div>
                 <nav className="flex-grow text-center my-2 md:my-0">
                     {['home', 'input', 'dashboard', 'knowledge', 'contact'].map(page => (
                         <a 
                            key={page}
                            href={`#${page}`} 
                            onClick={handleNavClick(page)} 
                            className={`mx-4 transition ${activePage === page ? 'text-primary-green font-semibold' : 'hover:text-primary-green'}`}
                         >
                             {t[page]}
                         </a>
                     ))}
                 </nav>
                 <div>
                     <select onChange={(e) => setLanguage(e.target.value)} value={language} className="p-2 border border-gray-300 rounded-md">
                         <option value="en">English</option>
                         <option value="hi">हिन्दी</option>
                         <option value="ta">தமிழ்</option>
                         {/* Add other language options here */}
                     </select>
                 </div>
             </header>
 
             {/* Main Content */}
             <main className="pt-28 md:pt-20">
                 <div className="max-w-7xl mx-auto bg-white min-h-[calc(100vh-80px)] shadow-lg rounded-lg my-8">
                    {renderSection()}
                 </div>
             </main>
 
             {/* Chatbot */}
             <div className="fixed bottom-8 right-8 z-50">
                  {/* Chatbot Popup */}
                 <div className={`absolute bottom-[80px] right-0 w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
                     <div className="bg-dark-green text-white p-4 flex justify-between items-center">
                         <span className="font-semibold">{t.chatbot_header_text}</span>
                         <button onClick={() => setIsChatOpen(false)} className="text-2xl">&times;</button>
                     </div>
                     <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-2">
                         {chatMessages.map((msg, index) => (
                              <div key={index} className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-light-green self-end' : 'bg-gray-200 self-start'}`}>
                                 {msg.sender === 'user' ? msg.text : t[msg.key]}
                             </div>
                         ))}
                          <div ref={chatMessagesEndRef} />
                     </div>
                     <div className="p-4 border-t border-gray-200 flex items-center gap-2">
                         <input 
                             type="text" 
                             placeholder={t.chatbot_input_placeholder} 
                             value={chatInput}
                             onChange={(e) => setChatInput(e.target.value)}
                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                             className="flex-grow p-2 border border-gray-300 rounded-full px-4"
                         />
                          <button onClick={handleSendMessage} className="text-lg text-primary-green hover:text-dark-green font-semibold">{t.chatbot_send}</button>
                          <button className="bg-primary-green text-white w-10 h-10 rounded-full text-xl flex items-center justify-center transition hover:scale-110">🎤</button>
                     </div>
                 </div>
                 {/* Chatbot Toggle Button */}
                 <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-primary-green text-white w-16 h-16 rounded-full text-2xl shadow-lg flex items-center justify-center transition transform hover:scale-110">
                     💬
                 </button>
             </div>
         </div>
     );
 };
 
 export default CropMitra;