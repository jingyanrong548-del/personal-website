/**
 * Working-fluid properties for high-temperature heat pumps (HTHPs).
 * IIR rows: Technical Brief Table 2 — "A Key Technology for Industrial Decarbonisation"
 * (61st IIR Technical Brief on Refrigeration Technologies, 2026).
 * ASHRAE rows (footnote f): ANSI/ASHRAE Standard 34 Tables D-1/D-2; 2021 ASHRAE Handbook—Fundamentals,
 * Ch. 29 Tables 3–5 (GWP100); UNEP/ASHRAE Refrigerant Factsheet (May 2025) for R-515B NBP.
 */
export const hthpRefrigerantsData = [
    { type: 'HFC', refrigerant: 'R161', tCr: '102.2', pCr: '5.09', nbp: '-37.5', odp: '0', gwp: '5', gwpRef: 'a', safety: 'A3' },
    { type: 'HFC', refrigerant: 'R152a', tCr: '113.3', pCr: '4.52', nbp: '-24.0', odp: '0', gwp: '124', gwpRef: 'b', safety: 'A2' },
    { type: 'HFC', refrigerant: 'R134a', tCr: '101.1', pCr: '4.06', nbp: '-26.1', odp: '0', gwp: '1430', safety: 'A1', dataRef: 'f' },
    { type: 'HFC', refrigerant: 'R245fa', tCr: '154.0', pCr: '3.65', nbp: '15.1', odp: '0', gwp: '1030', safety: 'B1', dataRef: 'f' },
    { type: 'HCFC', refrigerant: 'R142b', tCr: '137.1', pCr: '4.06', nbp: '-9.2', odp: '0.057', gwp: '2190', safety: 'A2', dataRef: 'f' },
    { type: 'HFO', refrigerant: 'R1234yf', tCr: '94.7', pCr: '3.38', nbp: '-29.0', odp: '0', gwp: '<1', safety: 'A2L' },
    { type: 'HFO', refrigerant: 'R1132(E)', tCr: '97.4', pCr: '5.09', nbp: '-35.7', odp: '0', odpRef: 'b', gwp: '1', safety: 'A1', safetyRef: 'b' },
    { type: 'HFO', refrigerant: 'R1243zf', tCr: '103.8', pCr: '3.52', nbp: '-25.5', odp: '0', odpRef: 'c', gwp: '0.8', safety: 'A2L', safetyRef: 'c' },
    { type: 'HFO', refrigerant: 'R1234ze(E)', tCr: '109.4', pCr: '3.64', nbp: '-19.0', odp: '0', gwp: '<1', safety: 'A2L' },
    { type: 'HFO', refrigerant: 'R1336mzz(E)', tCr: '137.7', pCr: '3.15', nbp: '7.5', odp: '0', gwp: '18', safety: 'A1' },
    { type: 'HFO', refrigerant: 'R1234ze(Z)', tCr: '150.1', pCr: '3.53', nbp: '9.8', odp: '0', gwp: '<1', safety: 'A2L' },
    { type: 'HFO', refrigerant: 'R1336mzz(Z)', tCr: '171.3', pCr: '2.90', nbp: '33.4', odp: '0', gwp: '2', safety: 'A1' },
    { type: 'HCFO', refrigerant: 'R1224yd(Z)', tCr: '155.5', pCr: '3.33', nbp: '14.0', odp: '0.00012', gwp: '<1', safety: 'A1' },
    { type: 'HCFO', refrigerant: 'R1233zd(E)', tCr: '166.5', pCr: '3.62', nbp: '18.0', odp: '0.00034', gwp: '4', gwpRef: 'a', safety: 'A1' },
    { type: 'HCO', refrigerant: 'R1130(E)', refrigerantRef: 'b', tCr: '234.1', pCr: '5.51', pCrRef: 'd', nbp: '47.7', odp: '0.00024', gwp: '5', safety: 'B2' },
    { type: 'HC', refrigerant: 'R1270', refrigerantRef: 'e', tCr: '91.1', pCr: '4.55', nbp: '-42.1', odp: '0', gwp: '<1', safety: 'A3' },
    { type: 'HC', refrigerant: 'R290', tCr: '96.7', pCr: '4.25', nbp: '-42.0', odp: '0', gwp: '<1', gwpRef: 'e', safety: 'A3' },
    { type: 'HC', refrigerant: 'R600a', tCr: '134.7', pCr: '3.66', nbp: '-11.0', odp: '0', gwp: '<1', gwpRef: 'e', safety: 'A3' },
    { type: 'HC', refrigerant: 'R600', tCr: '152.0', pCr: '3.80', nbp: '-0.5', odp: '0', gwp: '<1', gwpRef: 'e', safety: 'A3' },
    { type: 'HC', refrigerant: 'R601a', tCr: '187.8', pCr: '3.38', nbp: '27.7', odp: '0', gwp: '4', safety: 'A3' },
    { type: 'HC', refrigerant: 'R601', tCr: '196.6', pCr: '3.37', nbp: '36.1', odp: '0', gwp: '5', safety: 'A3' },
    { type: 'Blend', refrigerant: 'R515B', tCr: '108.7', pCr: '3.58', nbp: '-19.0', odp: '0', gwp: '320', safety: 'A1', dataRef: 'f' },
    { type: 'Others', refrigerant: 'R717', tCr: '132.3', pCr: '11.33', nbp: '-33.0', odp: '0', gwp: '0', safety: 'B2L' },
    { type: 'Others', refrigerant: 'R718', tCr: '373.9', pCr: '22.06', nbp: '100.0', odp: '0', gwp: '0', safety: 'A1' },
    { type: 'Others', refrigerant: 'R744', tCr: '31.0', pCr: '7.38', nbp: '-78.5', odp: '0', gwp: '1', safety: 'A1' },
];
