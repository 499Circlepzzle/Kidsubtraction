import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { DifficultySettings } from "@/lib/game";
import { useTranslation } from "@/lib/i18n/translations";

interface DifficultySettingsProps {
  settings: DifficultySettings;
  onSave: (settings: DifficultySettings) => void;
  onCancel: () => void;
}

export function DifficultySettingsPanel({ settings, onSave, onCancel }: DifficultySettingsProps) {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState<DifficultySettings>({ ...settings });

  const handleTimeChange = (value: number[]) => {
    setLocalSettings((prev: DifficultySettings) => ({
      ...prev,
      timePerProblem: value[0]
    }));
  };

  const handleSwitchChange = (key: keyof DifficultySettings) => {
    setLocalSettings((prev: DifficultySettings) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{t('difficultySettings')}</CardTitle>
        <CardDescription>{t('customizeGameSettings')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>{t('timePerProblem')}: {localSettings.timePerProblem} {t('seconds')}</Label>
            <Slider
              value={[localSettings.timePerProblem]}
              onValueChange={handleTimeChange}
              min={2}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('voiceFeedback')}</Label>
            <Switch
              checked={localSettings.voiceEnabled}
              onCheckedChange={() => handleSwitchChange('voiceEnabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('soundEffects')}</Label>
            <Switch
              checked={localSettings.soundEnabled}
              onCheckedChange={() => handleSwitchChange('soundEnabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('autoAdvance')}</Label>
            <Switch
              checked={localSettings.autoAdvance}
              onCheckedChange={() => handleSwitchChange('autoAdvance')}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button onClick={() => onSave(localSettings)}>
            {t('saveSettings')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}