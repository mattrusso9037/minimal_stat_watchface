import React from 'react';
import { THEME_COLORS } from './themeColors';

const colorConfig = [
    {
        key: 'PrimaryColor',
        label: 'Primary Color',
        colors: THEME_COLORS,
    },
    {
        key: 'SecondaryColor',
        label: 'Secondary Color',
        colors: THEME_COLORS,
    }
];

function Settings() {
    return (
        <Page>
            <Section title={<Text bold align={'left'}>Background</Text>}>
                <ImagePicker
                    title='Image Select'
                    description='Pick an image to use in this app'
                    label='Image Select'
                    sublabel='Note: It may take a few minutes to transfer.'
                    settingsKey='image'
                    imageWidth='300'
                    imageHeight='300'
                />
            </Section>
            <Section title={<Text bold align='left'>Theme</Text>}>
                {
                    colorConfig.map((item) => {
                        return (
                            <Section>
                                <Text>{item.label}</Text>
                                <ColorSelect
                                    settingsKey={item.key}
                                    colors={item.colors}
                                />
                            </Section>
                        )
                    })
                }
            </Section>
            <Section title={<Text>Metric Display</Text>}>
                <Toggle
                    settingsKey='metricWhitelist'
                    label='Distance'
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(Settings);