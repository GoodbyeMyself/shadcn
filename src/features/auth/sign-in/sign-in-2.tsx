import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/assets/logo'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { InteractiveGridPattern } from './components/interactive-grid-pattern'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn2() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in-2' })
  const { t } = useTranslation('auth')

  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div
        className={cn(
          'relative hidden h-full flex-col overflow-hidden bg-zinc-900 p-10 text-white lg:flex'
        )}
      >
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Logo className='mr-2 size-6' />
          <span>Class Application</span>
        </div>
        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[0%] h-full skew-y-12'
          )}
        />
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg font-medium leading-8'>
              &ldquo;This starter template has saved me countless hours of work
              and helped me deliver projects to my clients faster than ever
              before.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full max-w-md flex-col justify-center'>
          <Card className='overflow-hidden rounded-3xl border-border/60 bg-background/95 shadow-xl'>
            <CardHeader className='space-y-2 pt-8 text-center'>
              <CardTitle className='text-balance text-2xl font-semibold'>
                {t('signIn.title')}
              </CardTitle>
              <CardDescription className='text-pretty text-sm leading-6'>
                {t('signIn.descriptionLine1')} <br />
                {t('signIn.descriptionLine2')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserAuthForm className='gap-4' redirectTo={redirect} />
            </CardContent>
            <CardFooter className='border-t px-6 py-5'>
              <p className='text-pretty text-center text-sm leading-6 text-muted-foreground'>
                {t('signIn.agreementPrefix')}{' '}
                <a
                  href='/terms'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  {t('shared.termsOfService')}
                </a>{' '}
                {t('shared.and')}{' '}
                <a
                  href='/privacy'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  {t('shared.privacyPolicy')}
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
