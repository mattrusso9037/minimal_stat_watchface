import React from 'react';

const DEFAULT_COLORS = [
    {
        color: '#FF6633',
    },
    {
        color: '#FF0033',
    },
    {
        color: '#212227',
    },
    {
        color: '#2274A5',
    },
    {
        color: '#65179c',
    },
    {
        color: '#6bdf12',
    },
    {
        color: '#E8C547',
    },
    {
        color: '#5C80BC',
    },
    {
        color: '#FF579F',
    },
    {
        color: '#51A3A3',
    },
];

const ACCENT_COLORS = [
    {
        color: '#A4C400',
    },
    {
        color: '#60A917',
    },
    {
        color: '#1BA1E2',
    },
    {
        color: '#8693AB',
    },
    {
        color: '#00ABA9',
    },
    {
        color: '#A20025',
    },
    {
        color: '#CDD1C4',
    },
    {
        color: '#FA6800',
    },
    {
        color: '#647687',
    },
    {
        color: '#76608A',
    },
];

const colorConfig = [
    {
        key: 'PrimaryColor',
        label: 'Primary Color',
        colors: DEFAULT_COLORS,
    },
    {
        key: 'SecondaryColor',
        label: 'Secondary Color',
        colors: ACCENT_COLORS,
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