import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessageModal = ({ councillor, onClose, onSend }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newErrors = {};
    if (!subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!message?.trim()) {
      newErrors.message = 'Message is required';
    }
    if (message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSend({
      councillorId: councillor?.id,
      subject,
      message,
      priority,
      timestamp: new Date()?.toISOString()
    });

    setSubject('');
    setMessage('');
    setPriority('normal');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
                Message {councillor?.name}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                {councillor?.designation} • {councillor?.ward}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-250 ease-out"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs md:text-sm text-foreground">
                    <span className="font-medium">Expected Response Time:</span> {councillor?.responseTime || '24-48 hours'}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Messages are reviewed during office hours: {councillor?.officeHours}
                  </p>
                </div>
              </div>
            </div>

            <Input
              label="Subject"
              type="text"
              placeholder="Brief description of your inquiry"
              value={subject}
              onChange={(e) => {
                setSubject(e?.target?.value);
                if (errors?.subject) setErrors({ ...errors, subject: '' });
              }}
              error={errors?.subject}
              required
            />

            <div>
              <label className="block text-sm md:text-base font-medium text-foreground mb-2">
                Priority Level
              </label>
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {[
                  { value: 'low', label: 'Low', icon: 'ArrowDown', color: 'text-muted-foreground' },
                  { value: 'normal', label: 'Normal', icon: 'Minus', color: 'text-primary' },
                  { value: 'high', label: 'High', icon: 'ArrowUp', color: 'text-warning' },
                  { value: 'urgent', label: 'Urgent', icon: 'AlertCircle', color: 'text-destructive' }
                ]?.map((option) => (
                  <button
                    key={option?.value}
                    type="button"
                    onClick={() => setPriority(option?.value)}
                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-md border transition-all duration-250 ease-out ${
                      priority === option?.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} className={priority === option?.value ? 'text-primary' : option?.color} />
                    <span className="text-xs md:text-sm font-medium">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm md:text-base font-medium text-foreground mb-2">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Describe your inquiry, concern, or feedback in detail..."
                value={message}
                onChange={(e) => {
                  setMessage(e?.target?.value);
                  if (errors?.message) setErrors({ ...errors, message: '' });
                }}
                className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-md border text-sm md:text-base transition-colors duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 ${
                  errors?.message
                    ? 'border-destructive bg-destructive/5' :'border-border bg-background'
                }`}
              />
              {errors?.message && (
                <p className="mt-1.5 text-xs md:text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors?.message}
                </p>
              )}
              <p className="mt-1.5 text-xs md:text-sm text-muted-foreground">
                {message?.length} characters (minimum 10 required)
              </p>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="Send"
            iconPosition="right"
            onClick={handleSubmit}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;