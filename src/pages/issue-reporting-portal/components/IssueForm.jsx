import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const IssueForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    priority: '',
    isAnonymous: false
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'infrastructure', label: 'Infrastructure & Roads' },
    { value: 'sanitation', label: 'Sanitation & Waste Management' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Street Lighting & Electricity' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'health', label: 'Health & Hygiene' },
    { value: 'administrative', label: 'Administrative Issues' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low - Can wait for scheduled maintenance' },
    { value: 'medium', label: 'Medium - Needs attention within a week' },
    { value: 'high', label: 'High - Requires immediate action' },
    { value: 'urgent', label: 'Urgent - Emergency situation' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    addFiles(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const files = Array.from(e?.dataTransfer?.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files?.filter(file => {
      const isImage = file?.type?.startsWith('image/');
      const isVideo = file?.type?.startsWith('video/');
      const isUnder10MB = file?.size <= 10 * 1024 * 1024;
      return (isImage || isVideo) && isUnder10MB;
    });

    const newFiles = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.category) newErrors.category = 'Please select an issue category';
    if (!formData?.title?.trim()) newErrors.title = 'Issue title is required';
    if (!formData?.description?.trim()) newErrors.description = 'Please provide issue description';
    if (!formData?.location?.trim()) newErrors.location = 'Location is required';
    if (!formData?.priority) newErrors.priority = 'Please select priority level';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, files: uploadedFiles });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-4 md:mb-6">
          Issue Details
        </h3>

        <div className="space-y-4 md:space-y-5">
          <Select
            label="Issue Category"
            description="Select the category that best describes your issue"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            placeholder="Choose a category"
          />

          <Input
            label="Issue Title"
            type="text"
            placeholder="Brief summary of the issue"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
            maxLength={100}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Provide detailed information about the issue..."
              rows={5}
              maxLength={1000}
              className={`w-full px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                errors?.description
                  ? 'border-destructive focus:ring-destructive' :'border-input focus:ring-ring'
              }`}
            />
            {errors?.description && (
              <p className="mt-1 text-xs md:text-sm text-destructive">{errors?.description}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {formData?.description?.length}/1000 characters
            </p>
          </div>

          <Input
            label="Location"
            type="text"
            placeholder="Street name, landmark, or area"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            error={errors?.location}
            required
            description="Provide specific location details for faster resolution"
          />

          <Select
            label="Priority Level"
            description="Help us understand the urgency of this issue"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleInputChange('priority', value)}
            error={errors?.priority}
            required
            placeholder="Select priority"
          />
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-4">
          Attachments
        </h3>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
        >
          <Icon name="Upload" size={40} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
          <p className="text-sm md:text-base text-foreground mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            Supports images and videos (max 10MB per file)
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" size="sm" asChild>
              <span>Browse Files</span>
            </Button>
          </label>
        </div>

        {uploadedFiles?.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles?.map((file) => (
              <div
                key={file?.id}
                className="flex items-center space-x-3 p-3 bg-muted rounded-md"
              >
                <div className="flex-shrink-0">
                  {file?.type?.startsWith('image/') ? (
                    <Icon name="Image" size={20} color="var(--color-primary)" />
                  ) : (
                    <Icon name="Video" size={20} color="var(--color-secondary)" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file?.id)}
                  className="flex-shrink-0 p-1 hover:bg-destructive/10 rounded transition-colors"
                >
                  <Icon name="X" size={18} color="var(--color-destructive)" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
        <Checkbox
          label="Submit Anonymously"
          description="Your identity will be hidden from public view. Note: Anonymous reports may take longer to resolve as we cannot contact you for additional information."
          checked={formData?.isAnonymous}
          onChange={(e) => handleInputChange('isAnonymous', e?.target?.checked)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          iconName="Send"
          iconPosition="right"
          fullWidth
          className="sm:flex-1"
        >
          Submit Issue
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          fullWidth
          className="sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;