import { useState } from 'react';
import { 
  EyeIcon, 
  ZoomInIcon, 
  ZoomOutIcon, 
  LanguagesIcon, 
  TypeIcon, 
  CopyCheckIcon, 
  KeyboardIcon, 
  MousePointerIcon, 
  XIcon
} from 'lucide-react';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [cursorSize, setCursorSize] = useState('normal');
  
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
    document.documentElement.style.fontSize = `${fontSize + 10}%`;
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 80));
    document.documentElement.style.fontSize = `${fontSize - 10}%`;
  };
  
  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };
  
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };
  
  const toggleDyslexicFont = () => {
    const newValue = !dyslexicFont;
    setDyslexicFont(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
  };
  
  const changeCursorSize = (size: string) => {
    setCursorSize(size);
    document.documentElement.dataset.cursor = size;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 mx-4 rounded-lg shadow-lg bg-background border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <EyeIcon className="w-5 h-5" />
            Accessibility Options
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close accessibility panel"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Font Size Controls */}
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <TypeIcon className="w-4 h-4" />
              Text Size: {fontSize}%
            </h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={decreaseFontSize}
                className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                aria-label="Decrease font size"
              >
                <ZoomOutIcon className="w-4 h-4" />
              </button>
              
              <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full"
                  style={{ width: `${(fontSize - 80) / 70 * 100}%` }}
                ></div>
              </div>
              
              <button 
                onClick={increaseFontSize}
                className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                aria-label="Increase font size"
              >
                <ZoomInIcon className="w-4 h-4" />
              </button>
              
              <button 
                onClick={resetFontSize}
                className="text-xs p-1 px-2 rounded-md bg-background hover:bg-muted transition-colors"
                aria-label="Reset font size"
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* Visual Options */}
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <EyeIcon className="w-4 h-4" />
              Visual Options
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={toggleHighContrast}
                className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
                  highContrast 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
                aria-pressed={highContrast}
              >
                <CopyCheckIcon className="w-4 h-4" />
                <span>High Contrast</span>
              </button>
              
              <button
                onClick={toggleDyslexicFont}
                className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
                  dyslexicFont 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
                aria-pressed={dyslexicFont}
              >
                <TypeIcon className="w-4 h-4" />
                <span>Dyslexic Font</span>
              </button>
            </div>
          </div>
          
          {/* Cursor Size */}
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <MousePointerIcon className="w-4 h-4" />
              Cursor Size
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => changeCursorSize('normal')}
                className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                  cursorSize === 'normal' 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
                aria-pressed={cursorSize === 'normal'}
              >
                <span>Normal</span>
              </button>
              
              <button
                onClick={() => changeCursorSize('large')}
                className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                  cursorSize === 'large' 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
                aria-pressed={cursorSize === 'large'}
              >
                <span>Large</span>
              </button>
              
              <button
                onClick={() => changeCursorSize('extra-large')}
                className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                  cursorSize === 'extra-large' 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
                aria-pressed={cursorSize === 'extra-large'}
              >
                <span>Extra Large</span>
              </button>
            </div>
          </div>
          
          {/* Keyboard Navigation */}
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <KeyboardIcon className="w-4 h-4" />
              Keyboard Navigation
            </h3>
            <button
              className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-background hover:bg-muted transition-colors"
              onClick={() => window.alert('Press Tab to navigate between elements, Enter to select, and Escape to go back.')}
            >
              <KeyboardIcon className="w-4 h-4" />
              <span>Show Keyboard Shortcuts</span>
            </button>
          </div>
          
          {/* Language Selection */}
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <LanguagesIcon className="w-4 h-4" />
              Language
            </h3>
            <select 
              className="w-full p-3 rounded-md bg-background border border-input"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}