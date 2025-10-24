import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface OwnerAccessModalProps {
  onClose: () => void;
}

const OwnerAccessModal: React.FC<OwnerAccessModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { checkForOwner } = useAuth();
  const { addToast } = useToast();
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isOwner = await checkForOwner(secretCode);
      if (isOwner) {
        addToast(t('owner_access_success'), 'success');
        onClose();
      } else {
        addToast(t('owner_access_fail'), 'error');
      }
    } catch (error) {
      // The checkForOwner function in context now handles the specific error message.
      // We show the generic fail message for security.
      addToast(t('owner_access_fail'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={t('owner_access_title')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-400">{t('owner_access_prompt')}</p>
        <Input
          id="secret-code"
          label={t('secret_code')}
          type="password"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
          required
        />
        <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>{t('cancel')}</Button>
            <Button type="submit" disabled={isLoading || !secretCode}>
                {isLoading ? t('verifying') : t('verify')}
            </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OwnerAccessModal;