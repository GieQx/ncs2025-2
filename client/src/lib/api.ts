import { apiRequest } from './queryClient';

/**
 * Chat API functions
 */
export const sendChatMessage = async (message: string) => {
  try {
    const response = await apiRequest('POST', '/api/chat', { message });
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Registration API functions
 */
export type RegistrationData = {
  fullName: string;
  email: string;
  organization: string;
  role: string;
};

export const submitRegistration = async (data: RegistrationData) => {
  try {
    const response = await apiRequest('POST', '/api/register', data);
    return await response.json();
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
};

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await apiRequest('POST', '/api/subscribe', { email });
    return await response.json();
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
