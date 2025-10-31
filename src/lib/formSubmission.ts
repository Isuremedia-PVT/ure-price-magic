export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  startDate?: string;
  notes?: string;
}

export interface ServiceData {
  serviceType: string;
  monthlyTotal: number;
  setupFee?: number;
  basePackage?: number;
  [key: string]: string | number | boolean | undefined;
}

export const generateUniqueCode = (): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ISM-${timestamp}-${random}`;
};

export const buildCheckoutUrl = (
  formData: FormData,
  serviceData: ServiceData
): string => {
  const baseUrl = "https://checkout.isuremedia.com/services-marketplace";
  const uniqueCode = generateUniqueCode();

  const params = new URLSearchParams();
  
  // Add form data
  params.append("firstName", formData.firstName);
  params.append("lastName", formData.lastName);
  params.append("email", formData.email);
  params.append("phone", formData.phone);
  if (formData.company) params.append("company", formData.company);
  if (formData.startDate) params.append("startDate", formData.startDate);
  if (formData.notes) params.append("notes", formData.notes);
  
  // Add unique code
  params.append("uniqueCode", uniqueCode);
  
  // Add service data
  params.append("serviceType", serviceData.serviceType);
  params.append("monthlyTotal", serviceData.monthlyTotal.toString());
  
  // Add all other service-specific data
  Object.entries(serviceData).forEach(([key, value]) => {
    if (key !== "serviceType" && key !== "monthlyTotal" && value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return `${baseUrl}?${params.toString()}`;
};

export const redirectToCheckout = (
  formData: FormData,
  serviceData: ServiceData
): void => {
  const url = buildCheckoutUrl(formData, serviceData);
  window.location.href = url;
};
