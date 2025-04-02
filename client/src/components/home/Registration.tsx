import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().min(2, { message: 'Organization must be at least 2 characters.' }),
  role: z.string().min(1, { message: 'Please select your professional role.' }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions.'
  })
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const Registration = () => {
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organization: '',
      role: '',
      termsAccepted: false
    }
  });

  const onSubmit = (data: RegistrationFormValues) => {
    // In a real implementation, this would submit to the server
    console.log(data);
    toast({
      title: "Registration Submitted",
      description: "Thank you for registering for NCS 2025!",
    });
  };

  return (
    <section id="register" className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23F1F1F1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat"
      }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Register for NCS 2025</h2>
              <p className="text-lg text-white/80 mb-8">
                Secure your spot at the premier convention for statistics professionals and data enthusiasts.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-xl">Early Bird Registration</h3>
                    <span className="bg-white text-primary text-xs px-3 py-1 rounded-full font-medium">Save 20%</span>
                  </div>
                  <p className="text-white/80 mb-3">Full access to all sessions, workshops, networking events, and resources.</p>
                  <div className="flex items-baseline mb-5">
                    <span className="text-3xl font-bold">$599</span>
                    <span className="text-white/60 text-sm ml-2 line-through">$749</span>
                  </div>
                  <p className="text-xs text-white/60 mb-6">Available until July 31, 2025</p>
                  <button className="w-full bg-white text-primary rounded-full py-3 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
                    Register Now
                  </button>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5">
                  <h3 className="font-bold text-xl mb-3">Student Registration</h3>
                  <p className="text-white/80 mb-3">Special rate for full-time students with valid ID.</p>
                  <div className="flex items-baseline mb-5">
                    <span className="text-3xl font-bold">$299</span>
                  </div>
                  <p className="text-xs text-white/60 mb-6">Student ID verification required</p>
                  <button className="w-full bg-white/20 text-white rounded-full py-3 text-sm font-medium hover:bg-white/30 transition-colors duration-300">
                    Student Registration
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <i className="fas fa-info-circle"></i>
                <span>Group discounts available for 5+ attendees from the same organization</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="font-bold text-xl mb-6">Quick Registration Form</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" 
                            placeholder="Enter your full name" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" 
                            placeholder="Enter your email address" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Organization</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white" 
                            placeholder="Enter your organization" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Professional Role</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="data-scientist">Data Scientist</SelectItem>
                            <SelectItem value="statistician">Statistician</SelectItem>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="academic">Professor/Academic</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="policy-maker">Policy Maker</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-4 w-4 border-white/20"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the terms and conditions
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-primary rounded-full py-3 text-sm font-bold hover:bg-primary/10 hover:text-white transition-colors duration-300"
                  >
                    Complete Registration
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
