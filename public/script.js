document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // --- Page Navigation Logic ---
    // ===================================
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');

    function showPage(hash) {
        // Hide all page sections
        pageSections.forEach(section => {
            section.classList.remove('active');
        });
        // Remove active class from all navigation links
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show the target page and activate its nav link
        const targetPage = document.querySelector(hash);
        if (targetPage) {
            targetPage.classList.add('active');
            const correspondingNavItem = document.querySelector(`a[href="${hash}"]`);
            if (correspondingNavItem) {
                correspondingNavItem.classList.add('active');
            }
        }
    }

    // Set up event listeners for navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = e.target.getAttribute('href');
            history.pushState(null, '', hash);
            showPage(hash);
        });
    });

    // Handle initial page load or back/forward buttons
    window.addEventListener('hashchange', () => {
        showPage(window.location.hash || '#home');
    });

    // Set the initial page on load
    if (window.location.hash) {
        showPage(window.location.hash);
    } else {
        showPage('#home');
    }

    // ===================================
    // --- Form Logic ---
    // ===================================
    const soilKnownRadios = document.querySelectorAll('input[name="soil_known"]');
    const soilKnownFields = document.getElementById('soil-known-fields');
    const soilUnknownFields = document.getElementById('soil-unknown-fields');
    const yieldForm = document.getElementById('yield-form');
    const gpsButton = document.getElementById('gps-button');
    let yieldChart;

    // Toggle form fields based on soil knowledge
    soilKnownRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'yes') {
                soilKnownFields.classList.remove('hidden');
                soilUnknownFields.classList.add('hidden');
            } else {
                soilKnownFields.classList.add('hidden');
                soilUnknownFields.classList.remove('hidden');
            }
        });
    });

    // Handle GPS button click for location
    gpsButton.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    alert(`GPS Location: Lat ${position.coords.latitude}, Lon ${position.coords.longitude}`);
                    document.getElementById('location').value = 'Fetched via GPS';
                },
                (error) => {
                    alert('Error getting location. Please enter manually.');
                    console.error('Geolocation Error:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });

    // Handle form submission and prediction
    yieldForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate a prediction
        const randomYield = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
        document.getElementById('predicted_yield').textContent = randomYield;
        document.getElementById('prediction-results').classList.remove('hidden');

        // Update URL and show dashboard
        history.pushState(null, '', '#dashboard');
        showPage('#dashboard');

        // Create or update the chart
        const ctx = document.getElementById('yieldChart').getContext('2d');
        const labels = ['Soil Type', 'Sowing Date', 'Irrigation', 'Expected'];
        const data = [
            Math.floor(Math.random() * 80) + 20,
            Math.floor(Math.random() * 80) + 20,
            Math.floor(Math.random() * 80) + 20,
            randomYield / 20
        ];

        if (yieldChart) {
            yieldChart.data.datasets[0].data = data;
            yieldChart.update();
        } else {
            yieldChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Analysis',
                        data: data,
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
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    });

    // ===================================
    // --- Language Translation Logic ---
    // ===================================
    const translations = {
        en: {
            home: 'Home', input: 'Input', dashboard: 'Dashboard', knowledge: 'Knowledge Hub', contact: 'Contact',
            home_title: 'AI-Powered Crop Yield Prediction',
            home_description_1: 'Welcome to **Crop Mitra**, your intelligent partner in farming. Our platform leverages the power of AI to provide accurate crop yield predictions, helping you make informed decisions for a more productive harvest.',
            home_description_2: 'By analyzing key factors like soil type, farm size, and weather patterns, we empower farmers with data-driven insights to maximize their yield and optimize resource usage. Let\'s grow together!',
            home_button: 'Get Started', input_title: 'Enter Farm Details', form_label_location: 'Farm Location',
            form_button_gps: 'Use GPS', form_label_size: 'Farm Size', unit_acres: 'Acres',
            unit_hectares: 'Hectares', unit_sq_m: 'Sq. Meters', form_label_soil_known: 'Do you know the soil type?',
            form_label_yes: 'Yes', form_label_no: 'No', form_label_soil_type: 'Soil Type',
            form_label_soil_color: 'Soil Color', form_label_absorption: 'Absorption Rate',
            form_option_select: 'Select...', soil_clay: 'Clay', soil_sandy: 'Sandy',
            soil_loamy: 'Loamy', soil_silty: 'Silty', soil_chalky: 'Chalky',
            soil_peaty: 'Peaty', color_black: 'Black', color_brown: 'Brown',
            color_red: 'Red', color_yellow: 'Yellow', color_grey: 'Grey',
            rate_high: 'High', rate_medium: 'Medium', rate_low: 'Low',
            form_label_seed: 'Seed Type / Crop', form_label_date: 'Sowing Date',
            form_label_irrigation: 'Irrigation Method', method_drip: 'Drip Irrigation',
            method_sprinkler: 'Sprinkler Irrigation', method_flood: 'Flood Irrigation',
            form_button_predict: 'Predict Yield', dashboard_title: 'Prediction Dashboard',
            yield_heading: 'Expected Yield', yield_unit: 'kg', tips_heading: 'Resource Optimization Tips',
            tip_1: 'Use organic fertilizers to improve soil health.', tip_2: 'Install a drip irrigation system to save water.',
            tip_3: 'Monitor local weather forecasts for timely actions.', analysis_heading: 'Yield Analysis Graph',
            knowledge_title: 'Knowledge Hub', kh_card1_title: 'Understanding Soil Health',
            kh_card1_text: 'Healthy soil is the foundation of a good harvest. Soil health refers to its ability to function as a living ecosystem to sustain plants, animals, and humans. Factors like soil type, pH levels, and nutrient content are crucial. Regular soil testing helps identify deficiencies and enables targeted fertilization.',
            kh_card2_title: 'The Importance of Timely Sowing',
            kh_card2_text: 'Sowing your seeds at the right time is critical for optimal growth. The ideal sowing date depends on local climate, crop type, and soil conditions. Sowing too early or too late can expose young plants to unfavorable weather, pests, or diseases, reducing the overall yield.',
            kh_card3_title: 'Efficient Irrigation Methods',
            kh_card3_text: 'Choosing the right irrigation method can significantly save water and improve crop productivity. **Drip irrigation** delivers water directly to the plant roots, minimizing waste. **Sprinkler systems** are efficient for larger fields, while **flood irrigation** is a traditional but water-intensive method.',
            contact_title: 'Contact Us', contact_info_text: 'For any queries, please reach out to **Team Crop Mitra**.',
            contact_email_label: 'Email:', contact_phone_label: 'Phone:', chatbot_button: 'Chat with Mitra',
            chatbot_header_text: 'Crop Mitra Chatbot', chatbot_input_placeholder: 'Type your message...',
            chatbot_send: 'Send', bot_welcome: 'Hello! How can I help you with your farming today?',
            bot_response_yield: 'Our AI analyzes your farm data to provide a yield prediction. Please fill out the form on the "Input" page.',
            bot_response_soil: 'Soil type is crucial for your crop. Knowing it helps our AI provide a more accurate prediction. You can find out by getting a soil test or by observing its color and absorption rate.',
            bot_response_contact: 'You can contact us via email at contact@cropmitra.com or by phone at +91-1234567890.',
            bot_response_irrigation: 'Efficient irrigation methods save water and improve crop health. Common methods include Drip, Sprinkler, and Flood irrigation.',
            bot_response_default: 'I am a simple chatbot for this prototype. I can answer questions about yield prediction, soil, and contact details. Try asking about "yield," "soil," or "contact."',
        },
        hi: {
            home: 'होम', input: 'इनपुट', dashboard: 'डैशबोर्ड', knowledge: 'ज्ञान केंद्र', contact: 'संपर्क करें',
            home_title: 'एआई-संचालित फसल उपज पूर्वानुमान',
            home_description_1: '**फसल मित्र** में आपका स्वागत है, खेती में आपका बुद्धिमान साथी। हमारा मंच सटीक फसल उपज का पूर्वानुमान प्रदान करने के लिए एआई की शक्ति का लाभ उठाता है, जिससे आपको अधिक उत्पादक फसल के लिए सूचित निर्णय लेने में मदद मिलती है।',
            home_description_2: 'मिट्टी के प्रकार, खेत के आकार और मौसम के पैटर्न जैसे प्रमुख कारकों का विश्लेषण करके, हम किसानों को अपनी उपज को अधिकतम करने और संसाधन उपयोग को अनुकूलित करने के लिए डेटा-संचालित अंतर्दृष्टि के साथ सशक्त बनाते हैं। आइए मिलकर बढ़ें!',
            home_button: 'शुरू करें', input_title: 'खेत का विवरण दर्ज करें', form_label_location: 'खेत का स्थान',
            form_button_gps: 'जीपीएस का उपयोग करें', form_label_size: 'खेत का आकार', unit_acres: 'एकड़',
            unit_hectares: 'हेक्टेयर', unit_sq_m: 'वर्ग मीटर', form_label_soil_known: 'क्या आप मिट्टी का प्रकार जानते हैं?',
            form_label_yes: 'हाँ', form_label_no: 'नहीं', form_label_soil_type: 'मिट्टी का प्रकार',
            form_label_soil_color: 'मिट्टी का रंग', form_label_absorption: 'अवशोषण दर',
            form_option_select: 'चुनें...', soil_clay: 'क्ले', soil_sandy: 'रेतीली',
            soil_loamy: 'लोमी', soil_silty: 'सिल्टी', soil_chalky: 'चाकी',
            soil_peaty: 'पीटी', color_black: 'काला', color_brown: 'भूरा',
            color_red: 'लाल', color_yellow: 'पीला', color_grey: 'ग्रे',
            rate_high: 'उच्च', rate_medium: 'मध्यम', rate_low: 'निम्न',
            form_label_seed: 'बीज का प्रकार / फसल', form_label_date: 'बुवाई की तारीख',
            form_label_irrigation: 'सिंचाई विधि', method_drip: 'ड्रिप सिंचाई',
            method_sprinkler: 'स्प्रिंकलर सिंचाई', method_flood: 'फ्लड सिंचाई',
            form_button_predict: 'उपज का पूर्वानुमान करें', dashboard_title: 'पूर्वानुमान डैशबोर्ड',
            yield_heading: 'अनुमानित उपज', yield_unit: 'किलोग्राम', tips_heading: 'संसाधन अनुकूलन युक्तियाँ',
            tip_1: 'मिट्टी के स्वास्थ्य को बेहतर बनाने के लिए जैविक उर्वरकों का उपयोग करें।', tip_2: 'पानी बचाने के लिए ड्रिप सिंचाई प्रणाली स्थापित करें।',
            tip_3: 'समय पर कार्रवाई के लिए स्थानीय मौसम के पूर्वानुमान की निगरानी करें।', analysis_heading: 'उपज विश्लेषण ग्राफ',
            knowledge_title: 'ज्ञान केंद्र', kh_card1_title: 'मिट्टी के स्वास्थ्य को समझना',
            kh_card1_text: 'स्वस्थ मिट्टी एक अच्छी फसल की नींव है। मिट्टी का स्वास्थ्य पौधों, जानवरों और मनुष्यों को बनाए रखने के लिए एक जीवित पारिस्थितिकी तंत्र के रूप में कार्य करने की उसकी क्षमता को संदर्भित करता है। मिट्टी का प्रकार, पीएच स्तर और पोषक तत्व जैसे कारक महत्वपूर्ण हैं। नियमित मिट्टी परीक्षण कमियों की पहचान करने और लक्षित उर्वरकों को सक्षम करने में मदद करता है।',
            kh_card2_title: 'समय पर बुवाई का महत्व',
            kh_card2_text: 'इष्टतम विकास के लिए सही समय पर बीज बोना महत्वपूर्ण है। आदर्श बुवाई की तारीख स्थानीय जलवायु, फसल के प्रकार और मिट्टी की स्थितियों पर निर्भर करती है। बहुत जल्दी या बहुत देर से बुवाई करने से युवा पौधे प्रतिकूल मौसम, कीटों या बीमारियों के संपर्क में आ सकते हैं, जिससे समग्र उपज कम हो जाती है।',
            kh_card3_title: 'कुशल सिंचाई विधियाँ',
            kh_card3_text: 'सही सिंचाई विधि चुनने से पानी की बचत हो सकती है और फसल की उत्पादकता में सुधार हो सकता है। **ड्रिप सिंचाई** पानी को सीधे पौधे की जड़ों तक पहुंचाती है, जिससे पानी की बर्बादी कम होती है। **स्प्रिंकलर प्रणाली** बड़े खेतों के लिए कुशल है, जबकि **बाढ़ सिंचाई** एक पारंपरिक लेकिन पानी-गहन विधि है।',
            contact_title: 'संपर्क करें', contact_info_text: 'किसी भी प्रश्न के लिए, कृपया **टीम फसल मित्र** से संपर्क करें।',
            contact_email_label: 'ईमेल:', contact_phone_label: 'फ़ोन:', chatbot_button: 'मित्र से चैट करें',
            chatbot_header_text: 'फसल मित्र चैटबॉट', chatbot_input_placeholder: 'अपना संदेश टाइप करें...',
            chatbot_send: 'भेजें', bot_welcome: 'नमस्ते! मैं आज आपकी खेती में कैसे मदद कर सकता हूँ?',
            bot_response_yield: 'हमारा एआई उपज का पूर्वानुमान प्रदान करने के लिए आपके खेत के डेटा का विश्लेषण करता है। कृपया "इनपुट" पृष्ठ पर फॉर्म भरें।',
            bot_response_soil: 'आपकी फसल के लिए मिट्टी का प्रकार महत्वपूर्ण है। इसे जानने से हमारे एआई को अधिक सटीक पूर्वानुमान प्रदान करने में मदद मिलती है। आप मिट्टी का परीक्षण करवाकर या उसके रंग और अवशोषण दर का अवलोकन करके इसका पता लगा सकते हैं।',
            bot_response_contact: 'आप contact@cropmitra.com पर ईमेल के माध्यम से या +91-1234567890 पर फोन करके हमसे संपर्क कर सकते हैं।',
            bot_response_irrigation: 'कुशल सिंचाई विधियाँ पानी बचाती हैं और फसल के स्वास्थ्य में सुधार करती हैं। सामान्य तरीकों में ड्रिप, स्प्रिंकलर और फ्लड सिंचाई शामिल हैं।',
            bot_response_default: 'मैं इस प्रोटोटाइप के लिए एक साधारण चैटबॉट हूं। मैं उपज पूर्वानुमान, मिट्टी और संपर्क विवरण के बारे में सवालों के जवाब दे सकता हूं। "उपज," "मिट्टी," या "संपर्क" के बारे में पूछने का प्रयास करें।',
        },
        ta: {
            home: 'முகப்பு', input: 'உள்ளீடு', dashboard: 'டாஷ்போர்டு', knowledge: 'அறிவு மையம்', contact: 'தொடர்பு',
            home_title: 'ஏஐ-இயக்கப்படும் பயிர் விளைச்சல் கணிப்பு',
            home_description_1: '**கிராப் மித்ரா**வுக்கு வரவேற்கிறோம், விவசாயத்தில் உங்கள் புத்திசாலித்தனமான பங்குதாரர். துல்லியமான பயிர் விளைச்சல் கணிப்புகளை வழங்க, எங்கள் தளம் ஏஐயின் சக்தியைப் பயன்படுத்துகிறது, மேலும் நீங்கள் அதிக உற்பத்தித்திறன் கொண்ட அறுவடைக்குத் தகவலறிந்த முடிவுகளை எடுக்க உதவுகிறது.',
            home_description_2: 'மண் வகை, பண்ணை அளவு மற்றும் வானிலை வடிவங்கள் போன்ற முக்கிய காரணிகளை பகுப்பாய்வு செய்வதன் மூலம், நாங்கள் விவசாயிகளுக்கு அவர்களின் விளைச்சலை அதிகரிக்கவும் மற்றும் வளங்களின் பயன்பாட்டை மேம்படுத்தவும் தரவு சார்ந்த நுண்ணறிவுகளை வழங்குகிறோம். நாம் ஒன்றாக வளருவோம்!',
            home_button: 'தொடங்கவும்', input_title: 'பண்ணை விவரங்களை உள்ளிடவும்', form_label_location: 'பண்ணை இருப்பிடம்',
            form_button_gps: 'ஜிபிஎஸ் பயன்படுத்தவும்', form_label_size: 'பண்ணை அளவு', unit_acres: 'ஏக்கர்',
            unit_hectares: 'ஹெக்டேர்', unit_sq_m: 'சதுர மீட்டர்கள்', form_label_soil_known: 'மண் வகை உங்களுக்குத் தெரியுமா?',
            form_label_yes: 'ஆம்', form_label_no: 'இல்லை', form_label_soil_type: 'மண் வகை',
            form_label_soil_color: 'மண் நிறம்', form_label_absorption: 'உறிஞ்சும் திறன்',
            form_option_select: 'தேர்ந்தெடுக்கவும்...', soil_clay: 'களிமண்', soil_sandy: 'மணல்',
            soil_loamy: 'வண்டல்', soil_silty: 'மண்டல்', soil_chalky: 'சுண்ணம்',
            soil_peaty: 'உதிரி', color_black: 'கருப்பு', color_brown: 'பழுப்பு',
            color_red: 'சிவப்பு', color_yellow: 'மஞ்சள்', color_grey: 'சாம்பல்',
            rate_high: 'அதிகம்', rate_medium: 'நடுத்தரம்', rate_low: 'குறைவு',
            form_label_seed: 'விதை வகை / பயிர்', form_label_date: 'விதைக்கும் தேதி',
            form_label_irrigation: 'நீர்ப்பாசன முறை', method_drip: 'சொட்டுநீர் பாசனம்',
            method_sprinkler: 'தெளிப்பு நீர்ப்பாசனம்', method_flood: 'வெள்ளப் பாசனம்',
            form_button_predict: 'விளைச்சலை கணிக்கவும்', dashboard_title: 'கணிப்பு டாஷ்போர்டு',
            yield_heading: 'எதிர்பார்க்கப்படும் விளைச்சல்', yield_unit: 'கிலோ', tips_heading: 'வள மேம்பாட்டு குறிப்புகள்',
            tip_1: 'மண் ஆரோக்கியத்தை மேம்படுத்த இயற்கை உரங்களைப் பயன்படுத்தவும்.', tip_2: 'தண்ணீரை சேமிக்க சொட்டுநீர் பாசன அமைப்பை நிறுவவும்.',
            tip_3: 'சரியான நேரத்தில் நடவடிக்கைகளை எடுக்க உள்ளூர் வானிலை முன்னறிவிப்புகளை கண்காணிக்கவும்.', analysis_heading: 'விளைச்சல் பகுப்பாய்வு வரைபடம்',
            knowledge_title: 'அறிவு மையம்', kh_card1_title: 'மண் ஆரோக்கியத்தைப் புரிந்துகொள்ளுதல்',
            kh_card1_text: 'ஆரோக்கியமான மண் ஒரு நல்ல அறுவடைக்கு அடிப்படை. மண் ஆரோக்கியம் என்பது தாவரங்கள், விலங்குகள் மற்றும் மனிதர்களைத் தாங்குவதற்கு ஒரு உயிருள்ள சுற்றுச்சூழல் அமைப்பாக செயல்படும் அதன் திறனைக் குறிக்கிறது. மண் வகை, pH நிலைகள் மற்றும் ஊட்டச்சத்து உள்ளடக்கம் போன்ற காரணிகள் முக்கியமானவை. வழக்கமான மண் பரிசோதனை குறைபாடுகளை அடையாளம் காண உதவுகிறது மற்றும் இலக்கு உரமிடுதலை செயல்படுத்துகிறது.',
            kh_card2_title: 'சரியான நேரத்தில் விதைப்பதன் முக்கியத்துவம்',
            kh_card2_text: 'சரியான நேரத்தில் உங்கள் விதைகளை விதைப்பது உகந்த வளர்ச்சிக்கு மிக முக்கியமானது. சிறந்த விதைப்பு தேதி உள்ளூர் காலநிலை, பயிர் வகை மற்றும் மண் நிலைகளைப் பொறுத்தது. மிக விரைவாக அல்லது மிக தாமதமாக விதைப்பது இளம் தாவரங்களை பாதகமான வானிலை, பூச்சிகள் அல்லது நோய்களுக்கு ஆளாக்கி, ஒட்டுமொத்த விளைச்சலைக் குறைக்கும்.',
            kh_card3_title: 'திறமையான நீர்ப்பாசன முறைகள்',
            kh_card3_text: 'சரியான நீர்ப்பாசன முறையைத் தேர்ந்தெடுப்பது தண்ணீரை கணிசமாக சேமிக்கவும் மற்றும் பயிர் உற்பத்தித்திறனை மேம்படுத்தவும் முடியும். **சொட்டுநீர் பாசனம்** தண்ணீரை நேரடியாக தாவர வேர்களுக்கு வழங்குகிறது, கழிவுகளை குறைக்கிறது. **தெளிப்பு அமைப்புகள்** பெரிய வயல்களுக்கு திறமையானவை, அதே சமயம் **வெள்ளப் பாசனம்** ஒரு பாரம்பரிய ஆனால் அதிக நீர் தேவைப்படும் முறையாகும்.',
            contact_title: 'தொடர்பு', contact_info_text: 'எந்தவொரு கேள்விகளுக்கும், தயவுசெய்து **குரூப் மித்ரா** குழுவைத் தொடர்பு கொள்ளவும்.',
            contact_email_label: 'மின்னஞ்சல்:', contact_phone_label: 'தொலைபேசி:', chatbot_button: 'மித்ராவுடன் அரட்டையடிக்கவும்',
            chatbot_header_text: 'கிராப் மித்ரா சாட்பாட்', chatbot_input_placeholder: 'உங்கள் செய்தியை உள்ளிடவும்...',
            chatbot_send: 'அனுப்பு', bot_welcome: 'வணக்கம்! இன்று உங்கள் விவசாயத்தில் நான் எப்படி உதவ முடியும்?',
            bot_response_yield: 'எங்கள் AI உங்கள் பண்ணை தரவை பகுப்பாய்வு செய்து விளைச்சல் கணிப்பை வழங்குகிறது. தயவுசெய்து "உள்ளீடு" பக்கத்தில் உள்ள படிவத்தை நிரப்பவும்.',
            bot_response_soil: 'மண் வகை உங்கள் பயிருக்கு மிக முக்கியமானது. அதை அறிந்திருப்பது எங்கள் AI க்கு மேலும் துல்லியமான கணிப்பை வழங்க உதவுகிறது. மண்ணை பரிசோதனை செய்வதன் மூலம் அல்லது அதன் நிறம் மற்றும் உறிஞ்சும் திறனை கவனிப்பதன் மூலம் நீங்கள் அதைக் கண்டறியலாம்.',
            bot_response_contact: 'contact@cropmitra.com என்ற மின்னஞ்சல் அல்லது +91-1234567890 என்ற தொலைபேசி எண் மூலம் நீங்கள் எங்களை தொடர்பு கொள்ளலாம்.',
            bot_response_irrigation: 'திறமையான நீர்ப்பாசன முறைகள் தண்ணீரை சேமித்து பயிர் ஆரோக்கியத்தை மேம்படுத்துகின்றன. பொதுவான முறைகளில் சொட்டு, தெளிப்பு மற்றும் வெள்ளப் பாசனம் ஆகியவை அடங்கும்.',
            bot_response_default: 'நான் இந்த முன்மாதிரிக்கான ஒரு எளிய சாட்பாட். விளைச்சல் கணிப்பு, மண் மற்றும் தொடர்பு விவரங்கள் பற்றி நான் கேள்விகளுக்கு பதிலளிக்க முடியும். "விளைச்சல்," "மண்," அல்லது "தொடர்பு" பற்றி கேட்க முயற்சி செய்யுங்கள்.',
        },
        te: {
            home: 'హోమ్', input: 'ఇన్‌పుట్', dashboard: 'డాష్‌బోర్డ్', knowledge: 'నాలెడ్జ్ హబ్', contact: 'సంప్రదించండి',
            home_title: 'AI ఆధారిత పంట దిగుబడి అంచనా',
            home_description_1: '**క్రాప్ మిత్రా**కు స్వాగతం, వ్యవసాయంలో మీ తెలివైన భాగస్వామి. మా ప్లాట్‌ఫారమ్ ఖచ్చితమైన పంట దిగుబడి అంచనాలను అందించడానికి AI శక్తిని ఉపయోగిస్తుంది, ఇది మరింత ఉత్పాదక పంట కోసం సమాచారంతో కూడిన నిర్ణయాలు తీసుకోవడంలో మీకు సహాయపడుతుంది.',
            home_description_2: 'మట్టి రకం, పొలం పరిమాణం మరియు వాతావరణ సరళి వంటి ముఖ్య అంశాలను విశ్లేషించడం ద్వారా, మేము రైతులను వారి దిగుబడిని పెంచుకోవడానికి మరియు వనరుల వినియోగాన్ని ఆప్టిమైజ్ చేయడానికి డేటా ఆధారిత అంతర్దృష్టులతో శక్తివంతం చేస్తాము. మనం కలిసి ఎదుగుదాం!',
            home_button: 'ప్రారంభించండి', input_title: 'పొలం వివరాలను నమోదు చేయండి', form_label_location: 'పొలం స్థానం',
            form_button_gps: 'GPS ఉపయోగించండి', form_label_size: 'పొలం పరిమాణం', unit_acres: 'ఎకరాలు',
            unit_hectares: 'హెక్టార్లు', unit_sq_m: 'చదరపు మీటర్లు', form_label_soil_known: 'మీకు మట్టి రకం తెలుసా?',
            form_label_yes: 'అవును', form_label_no: 'లేదు', form_label_soil_type: 'మట్టి రకం',
            form_label_soil_color: 'మట్టి రంగు', form_label_absorption: 'శోషణ రేటు',
            form_option_select: 'ఎంచుకోండి...', soil_clay: 'బంకమట్టి', soil_sandy: 'ఇసుక',
            soil_loamy: 'లోమీ', soil_silty: 'సిల్టీ', soil_chalky: 'సున్నపురాయి',
            soil_peaty: 'పీటీ', color_black: 'నలుపు', color_brown: 'గోధుమ',
            color_red: 'ఎరుపు', color_yellow: 'పసుపు', color_grey: 'బూడిదరంగు',
            rate_high: 'అధిక', rate_medium: 'మధ్యస్థ', rate_low: 'తక్కువ',
            form_label_seed: 'విత్తన రకం / పంట', form_label_date: 'విత్తే తేదీ',
            form_label_irrigation: 'నీటిపారుదల పద్ధతి', method_drip: 'డ్రిప్ నీటిపారుదల',
            method_sprinkler: 'స్ప్రింక్లర్ నీటిపారుదల', method_flood: 'ఫ్లడ్ నీటిపారుదల',
            form_button_predict: 'దిగుబడిని అంచనా వేయండి', dashboard_title: 'అంచనా డాష్‌బోర్డ్',
            yield_heading: 'ఆశించిన దిగుబడి', yield_unit: 'కిలోలు', tips_heading: 'వనరుల ఆప్టిమైజేషన్ చిట్కాలు',
            tip_1: 'మట్టి ఆరోగ్యాన్ని మెరుగుపరచడానికి సేంద్రీయ ఎరువులను ఉపయోగించండి.', tip_2: 'నీటిని ఆదా చేయడానికి డ్రిప్ ఇరిగేషన్ వ్యవస్థను ఏర్పాటు చేయండి.',
            tip_3: 'సకాలంలో చర్యల కోసం స్థానిక వాతావరణ అంచనాలను పర్యవేక్షించండి.', analysis_heading: 'దిగుబడి విశ్లేషణ గ్రాఫ్',
            knowledge_title: 'నాలెడ్జ్ హబ్', kh_card1_title: 'మట్టి ఆరోగ్యాన్ని అర్థం చేసుకోవడం',
            kh_card1_text: 'ఆరోగ్యకరమైన మట్టి మంచి పంటకు పునాది. మట్టి ఆరోగ్యం అనేది మొక్కలు, జంతువులు మరియు మానవులను నిలబెట్టడానికి ఒక జీవన పర్యావరణ వ్యవస్థగా పనిచేసే దాని సామర్థ్యాన్ని సూచిస్తుంది. మట్టి రకం, pH స్థాయిలు మరియు పోషకాల వంటి అంశాలు చాలా ముఖ్యమైనవి. సాధారణ మట్టి పరీక్ష లోపాలను గుర్తించడంలో మరియు లక్ష్య ఎరువులను ప్రారంభించడంలో సహాయపడుతుంది.',
            kh_card2_title: 'సకాలంలో విత్తడం యొక్క ప్రాముఖ్యత',
            kh_card2_text: 'సరైన పెరుగుదల కోసం మీ విత్తనాలను సరైన సమయంలో విత్తడం చాలా ముఖ్యం. ఆదర్శ విత్తే తేదీ స్థానిక వాతావరణం, పంట రకం మరియు మట్టి పరిస్థితులపై ఆధారపడి ఉంటుంది. చాలా ముందుగా లేదా చాలా ఆలస్యంగా విత్తడం యువ మొక్కలను అననుకూల వాతావరణం, తెగుళ్ళు లేదా వ్యాధులకు గురి చేస్తుంది, మొత్తం దిగుబడిని తగ్గిస్తుంది.',
            kh_card3_title: 'సమర్థవంతమైన నీటిపారుదల పద్ధతులు',
            kh_card3_text: 'సరైన నీటిపారుదల పద్ధతిని ఎంచుకోవడం వలన నీటిని గణనీయంగా ఆదా చేయవచ్చు మరియు పంట ఉత్పాదకతను మెరుగుపరచవచ్చు. **డ్రిప్ నీటిపారుదల** నీటిని నేరుగా మొక్కల వేర్లకు అందిస్తుంది, వ్యర్థాలను తగ్గించవచ్చు. **స్ప్రింక్లర్ వ్యవస్థలు** పెద్ద పొలాలకు సమర్థవంతంగా ఉంటాయి, అయితే **ఫ్లడ్ నీటిపారుదల** ఒక సాంప్రదాయకమైన కానీ ఎక్కువ నీటిని ఉపయోగించే పద్ధతి.',
            contact_title: 'సంప్రదించండి', contact_info_text: 'ఏవైనా ప్రశ్నల కోసం, దయచేసి **టీమ్ క్రాప్ మిత్రా**ను సంప్రదించండి.',
            contact_email_label: 'ఇమెయిల్:', contact_phone_label: 'ఫోన్:', chatbot_button: 'మిత్రాతో చాట్ చేయండి',
            chatbot_header_text: 'క్రాప్ మిత్రా చాట్‌బాట్', chatbot_input_placeholder: 'మీ సందేశాన్ని టైప్ చేయండి...',
            chatbot_send: 'పంపండి', bot_welcome: 'నమస్కారం! నేను ఈరోజు మీ వ్యవసాయంలో ఎలా సహాయపడగలను?',
            bot_response_yield: 'మా AI మీ పొలం డేటాను విశ్లేషించి దిగుబడి అంచనాను అందిస్తుంది. దయచేసి "ఇన్‌పుట్" పేజీలో ఉన్న ఫారమ్‌ను పూరించండి.',
            bot_response_soil: 'మీ పంటకు మట్టి రకం చాలా ముఖ్యం. దాని గురించి తెలుసుకోవడం మా AIకి మరింత ఖచ్చితమైన అంచనాను అందించడంలో సహాయపడుతుంది. మీరు మట్టి పరీక్ష చేయించుకోవడం ద్వారా లేదా దాని రంగు మరియు శోషణ రేటును గమనించడం ద్వారా తెలుసుకోవచ్చు.',
            bot_response_contact: 'మీరు contact@cropmitra.comకు ఇమెయిల్ ద్వారా లేదా +91-1234567890కు ఫోన్ ద్వారా మమ్మల్ని సంప్రదించవచ్చు.',
            bot_response_irrigation: 'సమర్థవంతమైన నీటిపారుదల పద్ధతులు నీటిని ఆదా చేసి పంట ఆరోగ్యాన్ని మెరుగుపరుస్తాయి. సాధారణ పద్ధతులలో డ్రిప్, స్ప్రింక్లర్ మరియు ఫ్లడ్ నీటిపారుదల ఉంటాయి.',
            bot_response_default: 'నేను ఈ ప్రోటోటైప్ కోసం ఒక సాధారణ చాట్‌బాట్‌ను. నేను దిగుబడి అంచనా, మట్టి మరియు సంప్రదింపు వివరాల గురించి ప్రశ్నలకు సమాధానం ఇవ్వగలను. "దిగుబడి," "మట్టి," లేదా "సంప్రదించు" గురించి అడగడానికి ప్రయత్నించండి.',
        },
        bn: {
            home: 'হোম', input: 'ইনপুট', dashboard: 'ড্যাশবোর্ড', knowledge: 'জ্ঞান কেন্দ্র', contact: 'যোগাযোগ',
            home_title: 'এআই-চালিত ফসল উৎপাদন পূর্বাভাস',
            home_description_1: '**ক্রপ মিত্রা**তে আপনাকে স্বাগতম, কৃষিক্ষেত্রে আপনার বুদ্ধিমান অংশীদার। আমাদের প্ল্যাটফর্ম সঠিক ফসল উৎপাদনের পূর্বাভাস দিতে এআই-এর শক্তিকে কাজে লাগায়, যা আপনাকে আরও উৎপাদনশীল ফসলের জন্য অবহিত সিদ্ধান্ত নিতে সাহায্য করে।',
            home_description_2: 'মাটির ধরণ, খামারের আকার এবং আবহাওয়ার ধরণগুলির মতো মূল কারণগুলি বিশ্লেষণ করে, আমরা কৃষকদের তাদের উৎপাদন সর্বাধিক করতে এবং সম্পদ ব্যবহার অপটিমাইজ করতে ডেটা-চালিত অন্তর্দৃষ্টি দিয়ে ক্ষমতায়ন করি। আসুন একসাথে বেড়ে উঠি!',
            home_button: 'শুরু করুন', input_title: 'খামারের বিবরণ লিখুন', form_label_location: 'খামারের অবস্থান',
            form_button_gps: 'জিপিএস ব্যবহার করুন', form_label_size: 'খামারের আকার', unit_acres: 'একর',
            unit_hectares: 'হেক্টর', unit_sq_m: 'বর্গ মিটার', form_label_soil_known: 'আপনি কি মাটির ধরণ জানেন?',
            form_label_yes: 'হ্যাঁ', form_label_no: 'না', form_label_soil_type: 'মাটির ধরণ',
            form_label_soil_color: 'মাটির রঙ', form_label_absorption: 'শোষণ হার',
            form_option_select: 'নির্বাচন করুন...', soil_clay: 'কাদামাটি', soil_sandy: 'বেলে',
            soil_loamy: 'লোমি', soil_silty: 'পলি', soil_chalky: 'চকমাটি',
            soil_peaty: 'পিটি', color_black: 'কালো', color_brown: 'বাদামী',
            color_red: 'লাল', color_yellow: 'হলুদ', color_grey: 'ধূসর',
            rate_high: 'উচ্চ', rate_medium: 'মাঝারি', rate_low: 'নিম্ন',
            form_label_seed: 'বীজ / ফসলের ধরণ', form_label_date: 'বীজ বপনের তারিখ',
            form_label_irrigation: 'সেচ পদ্ধতি', method_drip: 'ড্রিপ সেচ',
            method_sprinkler: 'স্প্রিংকলার সেচ', method_flood: 'বন্যা সেচ',
            form_button_predict: 'উৎপাদন পূর্বাভাস করুন', dashboard_title: 'পূর্বাভাস ড্যাশবোর্ড',
            yield_heading: 'প্রত্যাশিত উৎপাদন', yield_unit: 'কেজি', tips_heading: 'সম্পদ অপটিমাইজেশন টিপস',
            tip_1: 'মাটির স্বাস্থ্য উন্নত করতে জৈব সার ব্যবহার করুন।', tip_2: 'পানি সাশ্রয় করতে ড্রিপ সেচ ব্যবস্থা স্থাপন করুন।',
            tip_3: 'সময় মতো পদক্ষেপ নিতে স্থানীয় আবহাওয়ার পূর্বাভাস পর্যবেক্ষণ করুন।', analysis_heading: 'উৎপাদন বিশ্লেষণ গ্রাফ',
            knowledge_title: 'জ্ঞান কেন্দ্র', kh_card1_title: 'মাটির স্বাস্থ্য বোঝা',
            kh_card1_text: 'সুস্থ মাটি একটি ভালো ফসলের ভিত্তি। মাটির স্বাস্থ্য বলতে উদ্ভিদ, প্রাণী এবং মানুষকে টিকিয়ে রাখার জন্য একটি জীবন্ত বাস্তুতন্ত্র হিসাবে কাজ করার তার ক্ষমতাকে বোঝায়। মাটির ধরণ, পিএইচ স্তর এবং পুষ্টির পরিমাণ গুরুত্বপূর্ণ উপাদান। নিয়মিত মাটি পরীক্ষা ঘাটতিগুলি সনাক্ত করতে এবং লক্ষ্যযুক্ত সার প্রয়োগ সক্ষম করতে সহায়তা করে।',
            kh_card2_title: 'সময় মতো বীজ বপনের গুরুত্ব',
            kh_card2_text: 'সঠিক সময়ে আপনার বীজ বপন করা সর্বোত্তম বৃদ্ধির জন্য গুরুত্বপূর্ণ। আদর্শ বীজ বপনের তারিখ স্থানীয় জলবায়ু, ফসলের ধরণ এবং মাটির অবস্থার উপর নির্ভর করে। খুব তাড়াতাড়ি বা খুব দেরিতে বীজ বপন করলে অল্প বয়স্ক গাছপালা প্রতিকূল আবহাওয়া, কীটপতঙ্গ বা রোগের সংস্পর্শে আসতে পারে, যা সামগ্রিক উৎপাদন কমিয়ে দেয়।',
            kh_card3_title: 'দক্ষ সেচ পদ্ধতি',
            kh_card3_text: 'সঠিক সেচ পদ্ধতি নির্বাচন করলে পানি সাশ্রয় হয় এবং ফসলের উৎপাদনশীলতা উন্নত হয়। **ড্রিপ সেচ** সরাসরি গাছের মূলে পানি সরবরাহ করে, অপচয় হ্রাস করে। **স্প্রিংকলার ব্যবস্থা** বড় ক্ষেত্রের জন্য কার্যকর, যখন **বন্যা সেচ** একটি ঐতিহ্যবাহী কিন্তু জল-নিবিড় পদ্ধতি।',
            contact_title: 'যোগাযোগ', contact_info_text: 'যেকোনো প্রশ্নের জন্য, অনুগ্রহ করে **টিম ক্রপ মিত্রা**-এর সাথে যোগাযোগ করুন।',
            contact_email_label: 'ইমেল:', contact_phone_label: 'ফোন:', chatbot_button: 'মিত্রার সাথে চ্যাট করুন',
            chatbot_header_text: 'ক্রপ মিত্রা চ্যাটবট', chatbot_input_placeholder: 'আপনার বার্তা লিখুন...',
            chatbot_send: 'পাঠান', bot_welcome: 'নমস্কার! আমি আজ আপনার কৃষিকাজে কীভাবে সাহায্য করতে পারি?',
            bot_response_yield: 'আমাদের এআই আপনার খামারের ডেটা বিশ্লেষণ করে একটি উৎপাদন পূর্বাভাস সরবরাহ করে। অনুগ্রহ করে "ইনপুট" পৃষ্ঠায় ফর্মটি পূরণ করুন।',
            bot_response_soil: 'আপনার ফসলের জন্য মাটির ধরণ অত্যন্ত গুরুত্বপূর্ণ। এটি জানা আমাদের এআইকে আরও সঠিক পূর্বাভাস দিতে সাহায্য করে। আপনি মাটির পরীক্ষা করিয়ে বা এর রঙ এবং শোষণ হার পর্যবেক্ষণ করে এটি জানতে পারেন।',
            bot_response_contact: 'আপনি contact@cropmitra.com-এ ইমেল বা +91-1234567890-এ ফোন করে আমাদের সাথে যোগাযোগ করতে পারেন।',
            bot_response_irrigation: 'দক্ষ সেচ পদ্ধতি জল সাশ্রয় করে এবং ফসলের স্বাস্থ্য উন্নত করে। সাধারণ পদ্ধতিগুলির মধ্যে ড্রিপ, স্প্রিংকলার এবং বন্যা সেচ অন্তর্ভুক্ত।',
            bot_response_default: 'আমি এই প্রোটোটাইপের জন্য একটি সাধারণ চ্যাটবট। আমি উৎপাদন পূর্বাভাস, মাটি এবং যোগাযোগের বিবরণ সম্পর্কে প্রশ্নের উত্তর দিতে পারি। "উৎপাদন," "মাটি," বা "যোগাযোগ" সম্পর্কে জিজ্ঞাসা করার চেষ্টা করুন।',
        },
        mr: {
            home: 'होम', input: 'इनपुट', dashboard: 'डॅशबोर्ड', knowledge: 'ज्ञान केंद्र', contact: 'संपर्क साधा',
            home_title: 'एआय-आधारित पीक उत्पादन अंदाज',
            home_description_1: '**पीक मित्रामध्ये** आपले स्वागत आहे, शेतीतला तुमचा हुशार सोबती. आमचे प्लॅटफॉर्म अचूक पीक उत्पादन अंदाज देण्यासाठी एआयच्या शक्तीचा वापर करते, ज्यामुळे तुम्हाला अधिक उत्पादक काढणीसाठी माहितीपूर्ण निर्णय घेण्यास मदत होते।',
            home_description_2: 'मातीचा प्रकार, शेताचा आकार आणि हवामानाचे नमुने यासारख्या महत्त्वाच्या घटकांचे विश्लेषण करून, आम्ही शेतकऱ्यांना त्यांचे उत्पादन वाढवण्यासाठी आणि संसाधनांचा वापर ऑप्टिमाइझ करण्यासाठी डेटा-आधारित अंतर्दृष्टी देतो. चला, एकत्र वाढूया!',
            home_button: 'सुरु करा', input_title: 'शेताचे तपशील भरा', form_label_location: 'शेताचे स्थान',
            form_button_gps: 'जीपीएस वापरा', form_label_size: 'शेताचा आकार', unit_acres: 'एकर',
            unit_hectares: 'हेक्टर', unit_sq_m: 'चौ. मीटर', form_label_soil_known: 'तुम्हाला मातीचा प्रकार माहित आहे का?',
            form_label_yes: 'होय', form_label_no: 'नाही', form_label_soil_type: 'मातीचा प्रकार',
            form_label_soil_color: 'मातीचा रंग', form_label_absorption: 'शोषणाचा दर',
            form_option_select: 'निवडा...', soil_clay: 'चिकणमाती', soil_sandy: 'वाळूमय',
            soil_loamy: 'पोयटामाती', soil_silty: 'गाळाची माती', soil_chalky: 'खडूची माती',
            soil_peaty: 'पीटी', color_black: 'काळा', color_brown: 'तपकिरी',
            color_red: 'लाल', color_yellow: 'पिवळा', color_grey: 'राखाडी',
            rate_high: 'उच्च', rate_medium: 'मध्यम', rate_low: 'निम्न',
            form_label_seed: 'बियाणे / पिकाचा प्रकार', form_label_date: 'पेरणीची तारीख',
            form_label_irrigation: 'सिंचन पद्धत', method_drip: 'ठिबक सिंचन',
            method_sprinkler: 'तुषार सिंचन', method_flood: 'पूर सिंचन',
            form_button_predict: 'उत्पादनाचा अंदाज घ्या', dashboard_title: 'अंदाज डॅशबोर्ड',
            yield_heading: 'अपेक्षित उत्पादन', yield_unit: 'किलो', tips_heading: 'संसाधन ऑप्टिमायझेशन टिपा',
            tip_1: 'मातीचे आरोग्य सुधारण्यासाठी सेंद्रिय खतांचा वापर करा.', tip_2: 'पाणी वाचवण्यासाठी ठिबक सिंचन प्रणाली स्थापित करा.',
            tip_3: 'वेळेवर कृती करण्यासाठी स्थानिक हवामानाचा अंदाज तपासा.', analysis_heading: 'उत्पादन विश्लेषण ग्राफ',
            knowledge_title: 'ज्ञान केंद्र', kh_card1_title: 'मातीचे आरोग्य समजून घेणे',
            kh_card1_text: 'निरोगी माती ही चांगल्या पिकाची पायाभरणी आहे. मातीचे आरोग्य म्हणजे वनस्पती, प्राणी आणि मानवांना टिकवून ठेवण्यासाठी एक जिवंत परिसंस्थेसारखे कार्य करण्याची तिची क्षमता. मातीचा प्रकार, पीएच पातळी आणि पोषक घटक महत्त्वाचे आहेत. नियमित माती परीक्षणामुळे कमतरता ओळखण्यात आणि लक्ष्यित खतांचा वापर करण्यास मदत होते.',
            kh_card2_title: 'वेळेवर पेरणीचे महत्त्व',
            kh_card2_text: 'इष्टतम वाढीसाठी योग्य वेळी बियाणे पेरणे महत्त्वाचे आहे. आदर्श पेरणीची तारीख स्थानिक हवामान, पिकाचा प्रकार आणि मातीच्या स्थितीवर अवलंबून असते. खूप लवकर किंवा खूप उशिरा पेरणी केल्याने तरुण रोपे प्रतिकूल हवामान, कीटक किंवा रोगांच्या संपर्कात येऊ शकतात, ज्यामुळे एकूण उत्पादन कमी होते.',
            kh_card3_title: 'कार्यक्षम सिंचन पद्धती',
            kh_card3_text: 'योग्य सिंचन पद्धत निवडल्याने पाणी वाचते आणि पिकाची उत्पादकता सुधारते. **ठिबक सिंचन** थेट झाडांच्या मुळांना पाणी पुरवते, ज्यामुळे पाण्याचा अपव्यय कमी होतो. **तुषार सिंचन** प्रणाली मोठ्या शेतांसाठी कार्यक्षम आहेत, तर **पूर सिंचन** ही एक पारंपारिक परंतु जल-केंद्रित पद्धत आहे.',
            contact_title: 'संपर्क साधा', contact_info_text: 'कोणत्याही प्रश्नांसाठी, कृपया **टीम पीक मित्रा**शी संपर्क साधा.',
            contact_email_label: 'ईमेल:', contact_phone_label: 'फोन:', chatbot_button: 'मित्रासोबत चॅट करा',
            chatbot_header_text: 'पीक मित्रा चॅटबॉट', chatbot_input_placeholder: 'तुमचा संदेश टाइप करा...',
            chatbot_send: 'पाठवा', bot_welcome: 'नमस्कार! मी आज तुम्हाला तुमच्या शेतीत कशी मदत करू शकेन?',
            bot_response_yield: 'आमचा एआय तुमच्या शेतातील डेटाचे विश्लेषण करून उत्पादन अंदाज देतो. कृपया "इनपुट" पृष्ठावरील फॉर्म भरा.',
            bot_response_soil: 'तुमच्या पिकासाठी मातीचा प्रकार महत्त्वाचा आहे. तो जाणून घेतल्याने आमच्या एआयला अधिक अचूक अंदाज देण्यास मदत होते. तुम्ही मातीची चाचणी करून किंवा तिच्या रंगाचे आणि शोषणाच्या दराचे निरीक्षण करून हे शोधू शकता.',
            bot_response_contact: 'तुम्ही contact@cropmitra.com वर ईमेल करून किंवा +91-1234567890 वर फोन करून आमच्याशी संपर्क साधू शकता.',
            bot_response_irrigation: 'कार्यक्षम सिंचन पद्धती पाणी वाचवतात आणि पिकाचे आरोग्य सुधारतात. सामान्य पद्धतींमध्ये ठिबक, तुषार आणि पूर सिंचन यांचा समावेश आहे.',
            bot_response_default: 'मी या प्रोटोटाइपसाठी एक साधा चॅटबॉट आहे. मी उत्पादन अंदाज, माती आणि संपर्क तपशीलांबद्दल प्रश्नांची उत्तरे देऊ शकतो. "उत्पादन," "माती," किंवा "संपर्क" बद्दल विचारण्याचा प्रयत्न करा.',
        },
        gu: {
            home: 'હોમ', input: 'ઇનપુટ', dashboard: 'ડેશબોર્ડ', knowledge: 'જ્ઞાન કેન્દ્ર', contact: 'સંપર્ક કરો',
            home_title: 'એઆઈ-સંચાલિત પાક ઉપજ અનુમાન',
            home_description_1: '**ક્રોપ મિત્રા**માં આપનું સ્વાગત છે, ખેતીમાં તમારા બુદ્ધિશાળી ભાગીદાર. અમારું પ્લેટફોર્મ સચોટ પાક ઉપજ અનુમાન પ્રદાન કરવા માટે એઆઈની શક્તિનો લાભ લે છે, જે તમને વધુ ઉત્પાદક લણણી માટે જાણકાર નિર્ણયો લેવામાં મદદ કરે છે.',
            home_description_2: 'જમીનના પ્રકાર, ખેતરના કદ અને હવામાનના પેટર્ન જેવા મુખ્ય પરિબળોનું વિશ્લેષણ કરીને, અમે ખેડૂતોને તેમની ઉપજને મહત્તમ કરવા અને સંસાધનોના ઉપયોગને ઑપ્ટિમાઇઝ કરવા માટે ડેટા-આધારિત આંતરદૃષ્ટિ સાથે સશક્ત કરીએ છીએ. ચાલો સાથે મળીને વિકાસ કરીએ!',
            home_button: 'શરૂ કરો', input_title: 'ખેતરની વિગતો દાખલ કરો', form_label_location: 'ખેતરનું સ્થાન',
            form_button_gps: 'જીપીએસનો ઉપયોગ કરો', form_label_size: 'ખેતરનું કદ', unit_acres: 'એકર',
            unit_hectares: 'હેક્ટર', unit_sq_m: 'ચો. મીટર', form_label_soil_known: 'શું તમે જમીનનો પ્રકાર જાણો છો?',
            form_label_yes: 'હા', form_label_no: 'ના', form_label_soil_type: 'જમીનનો પ્રકાર',
            form_label_soil_color: 'જમીનનો રંગ', form_label_absorption: 'શોષણ દર',
            form_option_select: 'પસંદ કરો...', soil_clay: 'ચીકણી માટી', soil_sandy: 'રેતાળ',
            soil_loamy: 'લોમી', soil_silty: 'પલી', soil_chalky: 'ચાકી',
            soil_peaty: 'પીટી', color_black: 'કાળો', color_brown: 'બ્રાઉન',
            color_red: 'લાલ', color_yellow: 'પીળો', color_grey: 'ગ્રે',
            rate_high: 'ઉચ્ચ', rate_medium: 'મધ્યમ', rate_low: 'નિમ્ન',
            form_label_seed: 'બીજ / પાકનો પ્રકાર', form_label_date: 'વાવણીની તારીખ',
            form_label_irrigation: 'સિંચાઈ પદ્ધતિ', method_drip: 'ડ્રીપ સિંચાઈ',
            method_sprinkler: 'સ્પ્રીંકલર સિંચાઈ', method_flood: 'પૂર સિંચાઈ',
            form_button_predict: 'ઉપજનું અનુમાન કરો', dashboard_title: 'અનુમાન ડેશબોર્ડ',
            yield_heading: 'અપેક્ષિત ઉપજ', yield_unit: 'કિલો', tips_heading: 'સંસાધન ઑપ્ટિમાઇઝેશન ટિપ્સ',
            tip_1: 'જમીનનું આરોગ્ય સુધારવા માટે જૈવિક ખાતરોનો ઉપયોગ કરો.', tip_2: 'પાણી બચાવવા માટે ડ્રીપ સિંચાઈ સિસ્ટમ ઇન્સ્ટોલ કરો.',
            tip_3: 'સમયસર પગલાં લેવા માટે સ્થાનિક હવામાનની આગાહીનું નિરીક્ષણ કરો.', analysis_heading: 'ઉપજ વિશ્લેષણ ગ્રાફ',
            knowledge_title: 'જ્ઞાન કેન્દ્ર', kh_card1_title: 'જમીનનું આરોગ્ય સમજવું',
            kh_card1_text: 'તંદુરસ્ત જમીન એ સારી લણણીનો પાયો છે. જમીનનું આરોગ્ય એ છોડ, પ્રાણીઓ અને મનુષ્યોને ટકાવી રાખવા માટે જીવંત ઇકોસિસ્ટમ તરીકે કાર્ય કરવાની તેની ક્ષમતાનો ઉલ્લેખ કરે છે. જમીનનો પ્રકાર, pH સ્તર અને પોષક તત્વોની સામગ્રી જેવા પરિબળો મહત્વપૂર્ણ છે. નિયમિત જમીન પરીક્ષણ ખામીઓને ઓળખવામાં અને લક્ષિત ખાતરને સક્ષમ કરવામાં મદદ કરે છે.',
            kh_card2_title: 'સમયસર વાવણીનું મહત્વ',
            kh_card2_text: 'શ્રેષ્ઠ વૃદ્ધિ માટે તમારા બીજને યોગ્ય સમયે વાવવું નિર્ણાયક છે. આદર્શ વાવણીની તારીખ સ્થાનિક આબોહવા, પાકના પ્રકાર અને જમીનની પરિસ્થિતિઓ પર આધાર રાખે છે. ખૂબ વહેલા અથવા ખૂબ મોડા વાવણી કરવાથી યુવાન છોડ પ્રતિકૂળ હવામાન, જંતુઓ અથવા રોગોના સંપર્કમાં આવી શકે છે, જે એકંદર ઉપજ ઘટાડે છે.',
            kh_card3_title: 'કાર્યક્ષમ સિંચાઈ પદ્ધતિઓ',
            kh_card3_text: 'યોગ્ય સિંચાઈ પદ્ધતિ પસંદ કરવાથી પાણીની નોંધપાત્ર બચત થઈ શકે છે અને પાકની ઉત્પાદકતામાં સુધારો થઈ શકે છે. **ડ્રીપ સિંચાઈ** પાણી સીધું છોડના મૂળ સુધી પહોંચાડે છે, કચરો ઓછો કરે છે. **સ્પ્રીંકલર સિસ્ટમ્સ** મોટા ખેતરો માટે કાર્યક્ષમ છે, જ્યારે **પૂર સિંચાઈ** એક પરંપરાગત પરંતુ પાણી-સઘન પદ્ધતિ છે.',
            contact_title: 'સંપર્ક કરો', contact_info_text: 'કોઈપણ પ્રશ્નો માટે, કૃપા કરીને **ટીમ ક્રોપ મિત્રા**નો સંપર્ક કરો.',
            contact_email_label: 'ઈમેલ:', contact_phone_label: 'ફોન:', chatbot_button: 'મિત્રા સાથે ચેટ કરો',
            chatbot_header_text: 'ક્રોપ મિત્રા ચેટબોટ', chatbot_input_placeholder: 'તમારો સંદેશ લખો...',
            chatbot_send: 'મોકલો', bot_welcome: 'નમસ્કાર! આજે હું તમને તમારી ખેતીમાં કેવી રીતે મદદ કરી શકું?',
            bot_response_yield: 'અમારું એઆઈ તમારા ખેતરના ડેટાનું વિશ્લેષણ કરીને ઉપજ અનુમાન પ્રદાન કરે છે. કૃપા કરીને "ઇનપુટ" પૃષ્ઠ પરનું ફોર્મ ભરો.',
            bot_response_soil: 'તમારા પાક માટે જમીનનો પ્રકાર નિર્ણાયક છે. તે જાણવાથી અમારા એઆઈને વધુ સચોટ અનુમાન આપવામાં મદદ મળે છે. તમે જમીનનું પરીક્ષણ કરાવીને અથવા તેના રંગ અને શોષણ દરનું અવલોકન કરીને તે શોધી શકો છો.',
            bot_response_contact: 'તમે contact@cropmitra.com પર ઇમેઇલ દ્વારા અથવા +91-1234567890 પર ફોન દ્વારા અમારો સંપર્ક કરી શકો છો.',
            bot_response_irrigation: 'કાર્યક્ષમ સિંચાઈ પદ્ધતિઓ પાણી બચાવે છે અને પાકના આરોગ્યને સુધારે છે. સામાન્ય પદ્ધતિઓમાં ડ્રીપ, સ્પ્રીંકલર અને પૂર સિંચાઈનો સમાવેશ થાય છે.',
            bot_response_default: 'હું આ પ્રોટોટાઇપ માટે એક સરળ ચેટબોટ છું. હું ઉપજ અનુમાન, જમીન અને સંપર્ક વિગતો વિશેના પ્રશ્નોના જવાબ આપી શકું છું. "ઉપજ," "જમીન," અથવા "સંપર્ક" વિશે પૂછવાનો પ્રયાસ કરો.',
        },
    };

    const languageSwitcher = document.getElementById('language-switcher');
    const allTranslatableElements = document.querySelectorAll('[data-lang-key]');

    function updateLanguage(lang) {
        allTranslatableElements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                const translation = translations[lang][key];
                // Check for bolded parts and replace with <strong>
                const bolded = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                element.innerHTML = bolded;
            }
        });
        // Update placeholder for input field
        const inputPlaceholder = document.getElementById('chatbot-input-field');
        if (translations[lang] && translations[lang]['chatbot_input_placeholder']) {
            inputPlaceholder.placeholder = translations[lang]['chatbot_input_placeholder'];
        }
    }

    languageSwitcher.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Set initial language to English on load
    updateLanguage(languageSwitcher.value);

    // ===================================
    // --- Chatbot Logic ---
    // ===================================
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputField = document.getElementById('chatbot-input-field');
    const chatbotSendButton = document.getElementById('chatbot-send-button');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.toggle('hidden');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotBox.classList.add('hidden');
    });

    // Function to add a message to the chat interface
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
            messageDiv.textContent = message;
        } else {
            messageDiv.classList.add('bot-message');
            // Use the translation key to get the correct text for the current language
            const lang = languageSwitcher.value;
            messageDiv.textContent = translations[lang][message];
        }
        chatbotMessages.appendChild(messageDiv);
        // Automatically scroll to the bottom of the chat
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to get a simple bot response based on user input
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        if (lowerCaseMessage.includes('yield') || lowerCaseMessage.includes('crop') || lowerCaseMessage.includes('predict')) {
            return 'bot_response_yield';
        } else if (lowerCaseMessage.includes('soil')) {
            return 'bot_response_soil';
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('number')) {
            return 'bot_response_contact';
        } else if (lowerCaseMessage.includes('irrigation') || lowerCaseMessage.includes('water')) {
            return 'bot_response_irrigation';
        } else {
            return 'bot_response_default';
        }
    }

    // Function to send a message and get a bot response
    function sendMessage() {
        const userMessage = chatbotInputField.value.trim();
        if (userMessage === '') return; // Don't send empty messages

        addMessage(userMessage, 'user');
        chatbotInputField.value = '';

        // Simulate a delay for the bot to "think" before responding
        setTimeout(() => {
            const botResponseKey = getBotResponse(userMessage);
            addMessage(botResponseKey, 'bot');
        }, 1000);
    }

    // Set up event listeners for sending messages
    chatbotSendButton.addEventListener('click', sendMessage);

    chatbotInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial bot greeting on chatbot load
    // The initial greeting is already in the HTML file, so this is not needed here
    // But it's good practice to show how to use the addMessage function for the bot
});