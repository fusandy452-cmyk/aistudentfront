// AI 留學顧問智能體 - 對話式前端應用
class StudyAbroadAdvisor {
    constructor() {
        this.currentPage = 'homepage';
        this.profileId = null;
        this.chatHistory = [];
        this.userProfile = {};
        this.isTyping = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadFromSession();
        
        // 設定預設的目標入學時間（12個月後）
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const monthString = nextYear.toISOString().slice(0, 7);
        document.getElementById('target_intake').value = monthString;
    }

    bindEvents() {
        // 首頁按鈕
        document.getElementById('start-consultation-btn').addEventListener('click', () => {
            this.goToPage('setup');
        });

        document.getElementById('learn-more-btn').addEventListener('click', () => {
            this.showFeatures();
        });

        // 設定頁面
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.goToPage('homepage');
        });

        document.getElementById('setup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitSetup();
        });

        // 對話頁面
        document.getElementById('back-to-setup').addEventListener('click', () => {
            this.goToPage('setup');
        });

        document.getElementById('send-message-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.getElementById('connect-human-btn').addEventListener('click', () => {
            this.connectHumanAdvisor();
        });

        // 國家選擇
        document.getElementById('countries-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('chip')) {
                this.toggleCountry(e.target);
            }
        });
    }

    loadFromSession() {
        this.profileId = sessionStorage.getItem('profile_id');
        this.userProfile = JSON.parse(sessionStorage.getItem('user_profile') || '{}');
        this.chatHistory = JSON.parse(sessionStorage.getItem('chat_history') || '[]');
        
        if (this.profileId && this.chatHistory.length > 0) {
            // 如果有歷史對話，直接進入對話頁面
            this.goToPage('chat');
            this.loadChatHistory();
        }
    }

    // ========== 頁面導航 ==========
    goToPage(page) {
        // 隱藏所有頁面
        document.querySelectorAll('[id$="-page"], #homepage, #features-section').forEach(el => {
            el.classList.add('hidden');
        });

        // 顯示目標頁面
        if (page === 'homepage') {
            document.getElementById('homepage').classList.remove('hidden');
        } else if (page === 'setup') {
            document.getElementById('setup-page').classList.remove('hidden');
        } else if (page === 'chat') {
            document.getElementById('chat-page').classList.remove('hidden');
        }

        this.currentPage = page;
        
        // 頁面切換動畫
        setTimeout(() => {
            document.querySelector(`#${page === 'homepage' ? 'homepage' : page + '-page'}`).classList.add('fade-in');
        }, 100);
    }

    showFeatures() {
        const featuresSection = document.getElementById('features-section');
        featuresSection.classList.remove('hidden');
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }

    // ========== 設定頁面功能 ==========
    toggleCountry(chip) {
        chip.classList.toggle('chip-unselected');
        chip.classList.toggle('chip-selected');
        this.updateCountriesInput();
    }

    updateCountriesInput() {
        const selectedChips = document.querySelectorAll('.chip-selected');
        const countries = Array.from(selectedChips).map(chip => chip.dataset.value);
        document.getElementById('countries').value = JSON.stringify(countries);
        
        // 驗證至少選擇一個國家
        const isValid = countries.length > 0;
        document.getElementById('countries').setCustomValidity(isValid ? '' : '請至少選擇一個國家');
    }

    async submitSetup() {
        const form = document.getElementById('setup-form');
        const submitBtn = document.getElementById('start-chat-btn');
        
        // 更新國家選擇
        this.updateCountriesInput();
        
        // 前端驗證
        if (!form.checkValidity()) {
            this.showToast('請填寫所有必填欄位', 'error');
            return;
        }

        // 準備用戶資料
        const formData = new FormData(form);
        this.userProfile = {
            // 個人基本資訊
            student_name: formData.get('student_name'),
            student_email: formData.get('student_email'),
            student_phone: formData.get('student_phone') || null,
            citizenship: formData.get('citizenship'),
            
            // 家長聯繫資訊
            parent_email: formData.get('parent_email') || null,
            parent_phone: formData.get('parent_phone') || null,
            
            // 學術背景
            high_school: formData.get('high_school'),
            graduation_year: parseInt(formData.get('graduation_year')),
            gpa: parseFloat(formData.get('gpa')),
            ap_courses: formData.get('ap_courses') || null,
            
            // 考試成績
            psat_score: formData.get('psat_score') || null,
            sat_score: formData.get('sat_score') || null,
            act_score: formData.get('act_score') || null,
            english_exam_type: formData.get('english_exam_type'),
            english_exam_score: formData.get('english_exam_score') || null,
            
            // 留學偏好
            degree: formData.get('degree'),
            countries: JSON.parse(formData.get('countries')),
            intended_schools: formData.get('intended_schools') || null,
            intended_major: formData.get('intended_major'),
            major_reason: formData.get('major_reason'),
            budget: parseInt(formData.get('budget')),
            target_intake: formData.get('target_intake'),
            
            // 課外活動
            extracurriculars: formData.get('extracurriculars'),
            
            // 其他
            how_did_you_know_pano: formData.get('how_did_you_know_pano')
        };

        // 設定按鈕狀態
        this.setButtonLoading(submitBtn, true);

        try {
            // 創建用戶檔案
            const response = await this.apiCall('/intake', 'POST', this.userProfile);
            
            if (response.ok) {
                this.profileId = response.data.profile_id;
                sessionStorage.setItem('profile_id', this.profileId);
                sessionStorage.setItem('user_profile', JSON.stringify(this.userProfile));
                
                this.showToast('設定完成！正在準備AI顧問...', 'success');
                
                // 進入對話頁面
                setTimeout(() => {
                    this.goToPage('chat');
                    this.startConversation();
                }, 1000);
            } else {
                throw new Error(response.error || '設定失敗');
            }
        } catch (error) {
            this.showToast(error.message || '設定失敗，請重試', 'error');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    // ========== 對話功能 ==========
    startConversation() {
        // 清空聊天歷史（新會話）
        this.chatHistory = [];
        this.clearChatContainer();
        
        // 添加歡迎消息
        this.addMessage('ai', '您好！我是您的AI留學顧問。我已經了解了您的基本資訊，現在讓我們深入討論您的留學計劃吧！\n\n您可以問我任何關於留學的問題，比如：\n• 推薦適合的學校和專業\n• 申請流程和時間規劃\n• 獎學金申請建議\n• 簽證和住宿資訊');
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        // 添加用戶消息
        this.addMessage('user', message);
        input.value = '';
        
        // 添加到聊天歷史
        this.chatHistory.push({ role: 'user', content: message });
        sessionStorage.setItem('chat_history', JSON.stringify(this.chatHistory));

        // 顯示打字指示器
        this.showTypingIndicator();

        try {
            // 發送到後端AI
            const response = await this.apiCall('/chat', 'POST', {
                profile_id: this.profileId,
                message: message,
                chat_history: this.chatHistory.slice(-10) // 只發送最近10條消息
            });

            if (response.ok) {
                this.hideTypingIndicator();
                this.addMessage('ai', response.data.response);
                
                // 添加到聊天歷史
                this.chatHistory.push({ role: 'assistant', content: response.data.response });
                sessionStorage.setItem('chat_history', JSON.stringify(this.chatHistory));
            } else {
                throw new Error(response.error || 'AI回應失敗');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('ai', '抱歉，我現在無法回應您的問題。請稍後再試，或者聯繫人工顧問獲得幫助。');
            console.error('Chat error:', error);
        }
    }

    addMessage(sender, content) {
        const chatContainer = document.getElementById('chat-container');
        const messageDiv = document.createElement('div');
        
        messageDiv.className = `flex justify-${sender === 'user' ? 'end' : 'start'} fade-in`;
        
        const bubbleClass = sender === 'user' ? 'message-user' : 'message-ai';
        const avatarHtml = sender === 'ai' ? `
            <div class="flex items-center mb-2">
                <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 text-sm font-bold mr-2">
                    AI
                </div>
                <span class="text-sm text-gray-500">AI顧問 / AI Advisor</span>
            </div>
        ` : '';

        messageDiv.innerHTML = `
            <div class="message-bubble ${bubbleClass}">
                ${avatarHtml}
                <div class="whitespace-pre-line">${this.escapeHtml(content)}</div>
            </div>
        `;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    showTypingIndicator() {
        const chatContainer = document.getElementById('chat-container');
        const typingDiv = document.createElement('div');
        
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start fade-in';
        
        typingDiv.innerHTML = `
            <div class="message-bubble message-ai">
                <div class="flex items-center mb-2">
                    <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 text-sm font-bold mr-2">
                        AI
                    </div>
                    <span class="text-sm text-gray-500">AI顧問 / AI Advisor</span>
                </div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot" style="animation-delay: 0.2s"></div>
                    <div class="typing-dot" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(typingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    clearChatContainer() {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = '';
    }

    loadChatHistory() {
        this.clearChatContainer();
        this.chatHistory.forEach(msg => {
            this.addMessage(msg.role === 'user' ? 'user' : 'ai', msg.content);
        });
    }

    // ========== 人工顧問銜接 ==========
    async connectHumanAdvisor() {
        if (!this.profileId) {
            this.showToast('請先完成基本設定', 'error');
            return;
        }

        const name = prompt('請輸入您的姓名（選填）：') || '';
        const email = prompt('請輸入您的電子郵件（選填）：') || '';
        const phone = prompt('請輸入您的電話（選填）：') || '';
        const lineId = prompt('請輸入您的LINE ID（選填）：') || '';

        if (!name && !email && !phone && !lineId) {
            this.showToast('請至少提供一種聯繫方式', 'error');
            return;
        }

        try {
            const response = await this.apiCall('/handoff', 'POST', {
                profile_id: this.profileId,
                name: name || null,
                email: email || null,
                phone: phone || null,
                line_user_id: lineId || null,
                consent: true
            });

            if (response.ok) {
                this.showToast('聯繫資訊已提交！專業顧問將盡快與您聯繫', 'success');
                
                // 添加系統消息
                this.addMessage('ai', '您的聯繫資訊已提交給我們的專業顧問團隊。他們將在24小時內與您聯繫，為您提供更深入的留學諮詢服務。\n\n感謝您使用AI留學顧問服務！');
            } else {
                throw new Error(response.error || '提交失敗');
            }
        } catch (error) {
            this.showToast(error.message || '提交失敗，請重試', 'error');
        }
    }

    // ========== 工具函數 ==========
    async apiCall(endpoint, method = 'GET', data = null) {
        const baseUrl = window.__CONFIG__?.API_BASE || 'http://localhost:8080/api/v1';
        const url = `${baseUrl}${endpoint}`;
        
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || `HTTP ${response.status}`);
            }
            
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.innerHTML = '<div class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>處理中...';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 toast-${type} fade-in`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // 3秒後自動移除
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 角色選擇功能
function goToStudentPage() {
    const profileId = localStorage.getItem('profile_id');
    if (profileId) {
        window.location.href = `/student?profile_id=${profileId}`;
    } else {
        alert('請先完成測評表單');
    }
}

function goToParentPage() {
    const profileId = localStorage.getItem('profile_id');
    if (profileId) {
        window.location.href = `/parent?profile_id=${profileId}`;
    } else {
        alert('請先完成測評表單');
    }
}

function showOriginalChat() {
    // 隱藏角色選擇，顯示原始聊天
    document.getElementById('role-selection').classList.add('hidden');
    document.getElementById('start-chat-btn').click();
}

// 修改表單提交成功後的處理
function showRoleSelection() {
    document.getElementById('role-selection').classList.remove('hidden');
    document.getElementById('role-selection').scrollIntoView({ behavior: 'smooth' });
}

// 初始化應用
let studyAdvisor;
document.addEventListener('DOMContentLoaded', () => {
    studyAdvisor = new StudyAbroadAdvisor();
    
    // 修改表單提交成功後的處理
    const originalHandleIntakeSuccess = studyAdvisor.handleIntakeSuccess;
    studyAdvisor.handleIntakeSuccess = function(profileId) {
        // 保存 profile_id
        localStorage.setItem('profile_id', profileId);
        
        // 顯示角色選擇而不是直接進入聊天
        showRoleSelection();
    };
});
