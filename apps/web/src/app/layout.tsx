import { Navbar01 } from '@/components/ui/navbar';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar-context';
import './global.css';
import { DashboardLayout } from '@/components/ui/dashboard-layout';

export const metadata = {
  title: 'Yapper',
  description: 'created solely to yap without constraints',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <Navbar01 />
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
