const countryCodeOptions = [
  { value: "+1", label: "+1 US / Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+91", label: "+91 India" },
  { value: "+61", label: "+61 Australia" },
  { value: "+64", label: "+64 New Zealand" },
  { value: "+971", label: "+971 UAE" },
  { value: "+65", label: "+65 Singapore" },
  { value: "+49", label: "+49 Germany" },
  { value: "+33", label: "+33 France" },
  { value: "+39", label: "+39 Italy" },
  { value: "+34", label: "+34 Spain" },
  { value: "+31", label: "+31 Netherlands" },
  { value: "+41", label: "+41 Switzerland" },
];

type WhatsAppPhoneFieldsProps = {
  idPrefix: string;
  codeName?: string;
  phoneName?: string;
  codeValue?: string;
  phoneValue?: string;
  defaultCode?: string;
  onCodeChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
};

export function formatPhoneWithCountryCode(countryCode: string, phone: string) {
  const trimmedCountryCode = countryCode.trim();
  const trimmedPhone = phone.trim();

  return [trimmedCountryCode, trimmedPhone].filter(Boolean).join(" ");
}

export function WhatsAppPhoneFields({
  idPrefix,
  codeName = "phoneCountryCode",
  phoneName = "whatsapp",
  codeValue,
  phoneValue,
  defaultCode = "+1",
  onCodeChange,
  onPhoneChange,
}: Readonly<WhatsAppPhoneFieldsProps>) {
  return (
    <div className="phone-fields">
      <div className="form-row">
        <label htmlFor={`${idPrefix}-phone-code`}>Country code</label>
        <select
          id={`${idPrefix}-phone-code`}
          name={codeName}
          autoComplete="tel-country-code"
          value={codeValue}
          defaultValue={codeValue === undefined ? defaultCode : undefined}
          onChange={(event) => onCodeChange?.(event.target.value)}
        >
          {countryCodeOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor={`${idPrefix}-whatsapp`}>WhatsApp / mobile number</label>
        <input
          id={`${idPrefix}-whatsapp`}
          name={phoneName}
          type="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={phoneValue}
          onChange={(event) => onPhoneChange?.(event.target.value)}
        />
      </div>
    </div>
  );
}
