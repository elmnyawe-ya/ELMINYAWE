
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { sendOtpEmail } from '../services/email.service';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpGenerated, setOtpGenerated] = useState('');

  const navigate = useNavigate();
  const { login, register, requestPasswordReset } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        addToast(t('login_success'), 'success');
      } else {
        await register(username, email, password);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setOtpGenerated(code);
        try { await sendOtpEmail(email, code); setOtpSent(true); } catch {}
        addToast(t('register_success'), 'success');
      }
      if (isLogin) navigate('/');
    } catch (error) {
      addToast(error instanceof Error ? error.message : String(error), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark-bg/50 border border-neon-cyan/30 rounded-lg shadow-lg glow-border">
        <h2 className="text-3xl font-bold text-center text-neon-cyan glow-text">
          {isLogin ? t('login_title') : t('register_title')}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="grid grid-cols-1 gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (isLogin ? t('logging_in') : t('registering')) : (isLogin ? t('login') : t('register'))}
            </Button>
          </div>
        </form>
        <div className="space-y-4">
          <div className="text-sm text-center text-gray-400">
            {isLogin ? t('no_account') : t('have_account')}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-neon-cyan hover:underline glow-text-hover">
              {isLogin ? t('register_now') : t('login_now')}
            </button>
          </div>
          {!isLogin && otpSent && (
            <div className="bg-dark-bg/30 border border-neon-cyan/30 rounded p-4 space-y-3">
              <div className="text-sm text-gray-300">{t('enter_otp', 'أدخل رمز التحقق المرسل إلى بريدك')}</div>
              <Input id="otp" type="text" value={otpInput} onChange={(e)=>setOtpInput(e.target.value)} />
              <Button type="button" onClick={()=>{ if (otpInput === otpGenerated) { addToast(t('otp_verified', 'تم التحقق من البريد الإلكتروني بنجاح'), 'success'); navigate('/'); } else { addToast(t('otp_invalid', 'رمز التحقق غير صحيح'), 'error'); } }}>
                {t('verify_otp', 'تحقق')}
              </Button>
            </div>
          )}
          <div className="text-sm text-center text-gray-400 space-y-2">
            <div>{t('forgot_password', 'نسيت كلمة المرور؟')}</div>
            <div className="grid grid-cols-1 gap-2">
              <Input id="resetEmail" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
              <Button type="button" onClick={async () => { try { setIsLoading(true); await requestPasswordReset(resetEmail); addToast(t('reset_email_sent', 'تم إرسال رابط إستعادة كلمة المرور إلى بريدك')); } catch (e) { addToast(t('reset_email_error', 'حدث خطأ أثناء إرسال رابط الاستعادة'), 'error'); } finally { setIsLoading(false); } }}>
                {t('send_reset_link', 'إرسال رابط الاستعادة')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
