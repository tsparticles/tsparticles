# रिलीज़ और संस्करण

यह प्रोजेक्ट अब एक ही रिपॉजिटरी से शिप होता है: `tsparticles/tsparticles`।

<WebsiteVersionInfo />

## जहां रिलीज का काम होता है

- मोनोरेपो रूट: <https://github.com/tsparticles/tsparticles>
- बंडल: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- इंजन: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- रैपर: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- प्रीसेट: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- पैलेट्स: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## संस्करण संरेखण नियम

- सभी `@tsparticles/*` पैकेजों को एक ही रिलीज़ लाइन से संरेखित रखें।
- विभिन्न बीटा लाइनों या प्रमुख संस्करणों को एक ऐप में मिलाने से बचें।

## व्यावहारिक रिलीज़ चेकलिस्ट

1. कार्यक्षेत्र `package.json` फ़ाइलों में लक्ष्य पैकेज संस्करण सत्यापित करें।
2. प्रभावित परियोजनाओं का निर्माण और परीक्षण करें।
3. दस्तावेज़ लिंक और खेल के मैदान के व्यवहार को मान्य करें।
4. मोनोरेपो रिलीज़ फ़्लो से प्रकाशित करें।
