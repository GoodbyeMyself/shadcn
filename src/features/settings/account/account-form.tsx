import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DatePicker } from '@/components/date-picker'

type AccountFormValues = {
  name: string
  dob: Date
  language: string
}

const defaultValues: Partial<AccountFormValues> = {
  name: '',
}

export function AccountForm() {
  const { t } = useTranslation('settings')

  const languages = [
    { label: t('accountForm.languages.en'), value: 'en' },
    { label: t('accountForm.languages.fr'), value: 'fr' },
    { label: t('accountForm.languages.de'), value: 'de' },
    { label: t('accountForm.languages.es'), value: 'es' },
    { label: t('accountForm.languages.pt'), value: 'pt' },
    { label: t('accountForm.languages.ru'), value: 'ru' },
    { label: t('accountForm.languages.ja'), value: 'ja' },
    { label: t('accountForm.languages.ko'), value: 'ko' },
    { label: t('accountForm.languages.zh'), value: 'zh' },
  ] as const

  const accountFormSchema = z.object({
    name: z
      .string()
      .min(1, t('accountForm.validation.nameRequired'))
      .min(2, t('accountForm.validation.nameMin'))
      .max(30, t('accountForm.validation.nameMax')),
    dob: z.date(t('accountForm.validation.dobRequired')),
    language: z.string().min(1, t('accountForm.validation.languageRequired')),
  })

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('accountForm.name')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('accountForm.namePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('accountForm.nameDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('accountForm.dob')}</FormLabel>
              <DatePicker selected={field.value} onSelect={field.onChange} />
              <FormDescription>
                {t('accountForm.dobDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('accountForm.language')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : t('accountForm.languagePlaceholder')}
                      <CaretSortIcon className='ms-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput
                      placeholder={t('accountForm.languageSearchPlaceholder')}
                    />
                    <CommandEmpty>
                      {t('accountForm.languageEmpty')}
                    </CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'size-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('accountForm.languageDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('actions.updateAccount')}</Button>
      </form>
    </Form>
  )
}
