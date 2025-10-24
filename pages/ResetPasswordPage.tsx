import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { updatePassword } = useAuth();
  const { addToast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRecovery, setIsRecovery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Supabase will set the session into recovery mode. We just show the form.
    setIsRecovery(true);
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast(t('passwords_not_match', 'كلمتا المرور غير متطابقتين'), 'error');
      return;
    }
    try {
      setIsLoading(true);
      await updatePassword(newPassword);
      addToast(t('password_updated', 'تم تحديث كلمة المرور بنجاح'), 'success');
    } catch (e) {
      addToast(t('password_update_error', 'حدث خطأ أثناء تحديث كلمة المرور'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark-bg/50 border border-neon-cyan/30 rounded-lg shadow-lg glow-border">
        <h2 className="text-3xl font-bold text-center text-neon-cyan glow-text">{t('reset_password_title', 'إعادة تعيين كلمة المرور')}</h2>
        {isRecovery ? (
          <form className="space-y-6" onSubmit={handleUpdate}>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('updating', 'جارٍ التحديث...') : t('update_password', 'تحديث كلمة المرور')}
            </Button>
          </form>
        ) : (
          <div className="text-center text-gray-300">{t('not_in_recovery', 'هذه الصفحة مخصصة لإعادة التعيين عبر الرابط المرسل إلى بريدك')}</div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
