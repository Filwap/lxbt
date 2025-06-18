document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // 切换导航菜单
            nav.classList.toggle('active');
            
            // 汉堡按钮动画
            burger.classList.toggle('toggle');
            
            // 链接动画
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动端菜单（如果打开）
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                }
                
                // 滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单字段
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            // 简单验证
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, '请输入您的邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入您的留言');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // 如果验证通过，显示成功消息（在实际应用中，这里会提交表单到服务器）
            if (isValid) {
                // 清空表单
                contactForm.reset();
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '感谢您的留言！我们会尽快回复您。';
                successMessage.style.color = '#1cc88a';
                successMessage.style.padding = '10px 0';
                successMessage.style.textAlign = 'center';
                
                contactForm.appendChild(successMessage);
                
                // 3秒后移除成功消息
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // 辅助函数：显示错误消息
    function showError(input, message) {
        // 移除可能已存在的错误消息
        removeError(input);
        
        // 创建错误消息元素
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74a3b';
        errorMessage.style.fontSize = '0.85rem';
        errorMessage.style.marginTop = '5px';
        
        // 将错误消息添加到输入字段后面
        input.parentNode.appendChild(errorMessage);
        
        // 为输入字段添加错误样式
        input.style.borderColor = '#e74a3b';
    }
    
    // 辅助函数：移除错误消息
    function removeError(input) {
        // 移除可能已存在的错误消息
        const parent = input.parentNode;
        const errorMessage = parent.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // 移除输入字段的错误样式
        input.style.borderColor = '';
    }
    
    // 辅助函数：验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 添加当前年份到页脚版权信息
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
    }
    
    // 为汉堡按钮添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .burger.toggle .line2 {
            opacity: 0;
        }
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // 微信二维码弹窗功能
    const modal = document.getElementById('wechat-modal');
    const wechatBtn = document.getElementById('wechat-btn');
    const closeBtn = document.querySelector('.close-btn');

    // 点击微信图标显示弹窗
    if (wechatBtn) {
        wechatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }

    // 点击关闭按钮关闭弹窗
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
});