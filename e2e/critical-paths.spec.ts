import { test, expect } from '@playwright/test';

test.describe('Critical User Journeys', () => {
  test('complete booking flow', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Réserver');
    await page.waitForURL('/reservation');
    
    // Select a course
    await page.click('[data-testid="course-card"]');
    
    // Fill booking details
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    
    // Complete booking
    await page.click('text=Procéder au paiement');
    
    // Verify redirect to Stripe
    await expect(page.url()).toContain('stripe.com');
  });

  test('authentication flow', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'admin@studio-elan.fr');
    await page.fill('[name="password"]', 'admin123');
    await page.click('text=Se connecter');
    
    await expect(page.url()).toBe('/admin');
    await expect(page.locator('text=Tableau de bord')).toBeVisible();
  });
});