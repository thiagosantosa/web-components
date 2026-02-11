import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerComponent, DatePreset } from './datepicker.component';

const meta: Meta<DatepickerComponent> = {
  title: 'Form Controls/Datepicker',
  component: DatepickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DatepickerComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 📅 Web Datepicker

O datepicker MAIS AVANÇADO do mercado Angular!

## 🚀 Diferenciais

| Feature | Material | PrimeNG | Ant Design | **Web Datepicker** |
|---------|----------|---------|------------|-------------------|
| Single Date | ✅ | ✅ | ✅ | ✅ |
| Range Selection | ⚠️ | ✅ | ✅ | ✅ |
| Multiple Dates | ❌ | ⚠️ | ❌ | ✅ |
| Time Picker | ❌ | ✅ | ✅ | ✅ |
| Presets | ❌ | ❌ | ⚠️ | ✅ |
| Feriados BR | ❌ | ❌ | ❌ | ✅ |
| Keyboard Nav | ⚠️ | ⚠️ | ⚠️ | ✅ |

## 💡 Uso Básico

\`\`\`typescript
<web-datepicker
  label="Data de Nascimento"
  [(ngModel)]="birthDate">
</web-datepicker>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<DatepickerComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    label: 'Selecione uma data',
    placeholder: 'DD/MM/YYYY',
  }
};

export const WithIcon: Story = {
  name: 'Com Ícone',
  args: {
    label: 'Data do Evento',
    icon: 'event',
    placeholder: 'Escolha a data',
  }
};

export const Required: Story = {
  name: 'Campo Obrigatório',
  args: {
    label: 'Data de Nascimento',
    required: true,
    helperText: 'Este campo é obrigatório',
  }
};

// ========== MODOS ==========

export const SingleDate: Story = {
  name: 'Single (Padrão)',
  args: {
    label: 'Data de Entrega',
    mode: 'single',
    helperText: 'Selecione uma data',
  }
};

export const RangeSelection: Story = {
  name: 'Range (Período)',
  args: {
    label: 'Período de Férias',
    mode: 'range',
    helperText: 'Selecione a data de início e fim',
  }
};

export const MultipleDates: Story = {
  name: 'Multiple (Múltiplas)',
  args: {
    label: 'Datas de Reunião',
    mode: 'multiple',
    helperText: 'Selecione múltiplas datas',
  }
};

export const WeekSelection: Story = {
  name: 'Week (Semana)',
  args: {
    label: 'Semana de Trabalho',
    mode: 'week',
    helperText: 'Selecione uma semana inteira',
  }
};

export const MonthSelection: Story = {
  name: 'Month (Mês)',
  args: {
    label: 'Mês de Referência',
    mode: 'month',
    helperText: 'Selecione um mês',
  }
};

// ========== TIME PICKER ==========

export const WithTimePicker: Story = {
  name: 'Com Seletor de Hora',
  args: {
    label: 'Data e Hora da Consulta',
    showTimePicker: true,
    format24h: true,
    helperText: 'Selecione data e hora',
  }
};

export const TimeAMPM: Story = {
  name: 'Hora AM/PM',
  args: {
    label: 'Horário do Evento',
    showTimePicker: true,
    format24h: false,
    helperText: 'Formato 12 horas (AM/PM)',
  }
};

// ========== VALIDAÇÃO ==========

export const WithMinMax: Story = {
  name: 'Min/Max Date',
  args: {
    label: 'Data de Check-in',
    minDate: new Date(),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    helperText: 'Disponível para os próximos 3 meses',
  }
};

export const OnlyWeekdays: Story = {
  name: 'Apenas Dias Úteis',
  args: {
    label: 'Data de Entrega',
    disabledWeekdays: [0, 6], // Domingo e Sábado
    helperText: 'Entregas apenas em dias úteis',
  }
};

export const WithError: Story = {
  name: 'Com Erro',
  args: {
    label: 'Data de Nascimento',
    required: true,
    error: true,
    errorMessage: 'Data de nascimento é obrigatória',
  }
};

export const WithSuccess: Story = {
  name: 'Com Sucesso',
  args: {
    label: 'Data Selecionada',
    success: true,
    successMessage: 'Data confirmada com sucesso!',
  }
};

// ========== PRESETS ==========

export const WithPresets: Story = {
  name: 'Com Presets (Atalhos)',
  args: {
    label: 'Período de Relatório',
    mode: 'range',
    showPresets: true,
    helperText: 'Use os atalhos rápidos na lateral',
  }
};

export const CustomPresets: Story = {
  name: 'Presets Customizados',
  args: {
    label: 'Período Customizado',
    mode: 'range',
    showPresets: true,
    presets: [
      {
        label: 'Esta Semana',
        icon: 'date_range',
        value: () => {
          const today = new Date();
          const start = new Date(today);
          start.setDate(today.getDate() - today.getDay());
          return { start, end: today };
        }
      },
      {
        label: 'Próximos 15 dias',
        icon: 'event_upcoming',
        value: () => {
          const today = new Date();
          const end = new Date(today);
          end.setDate(today.getDate() + 15);
          return { start: today, end };
        }
      },
      {
        label: 'Trimestre Atual',
        icon: 'calendar_view_month',
        value: () => {
          const today = new Date();
          const quarter = Math.floor(today.getMonth() / 3);
          const start = new Date(today.getFullYear(), quarter * 3, 1);
          const end = new Date(today.getFullYear(), quarter * 3 + 3, 0);
          return { start, end };
        }
      }
    ] as DatePreset[],
  }
};

// ========== CASOS DE USO ==========

export const BookingCheckIn: Story = {
  name: '🏨 Hotel Check-in/Check-out',
  args: {
    label: 'Período da Reserva',
    mode: 'range',
    minDate: new Date(),
    showPresets: true,
    helperText: 'Selecione as datas de entrada e saída',
  }
};

export const BirthdayPicker: Story = {
  name: '🎂 Data de Nascimento',
  args: {
    label: 'Data de Nascimento',
    mode: 'single',
    maxDate: new Date(),
    icon: 'cake',
    required: true,
    helperText: 'Você deve ter pelo menos 18 anos',
  }
};

export const AppointmentScheduler: Story = {
  name: '📅 Agendamento de Consulta',
  args: {
    label: 'Data e Hora da Consulta',
    mode: 'single',
    showTimePicker: true,
    minDate: new Date(),
    disabledWeekdays: [0, 6],
    icon: 'medical_services',
    helperText: 'Consultas disponíveis de segunda a sexta',
  }
};

export const FlightBooking: Story = {
  name: '✈️ Reserva de Voo',
  args: {
    label: 'Datas do Voo',
    mode: 'range',
    minDate: new Date(),
    showPresets: true,
    icon: 'flight',
    helperText: 'Selecione ida e volta',
  }
};

export const EventScheduler: Story = {
  name: '🎉 Agendamento de Evento',
  args: {
    label: 'Data do Evento',
    mode: 'single',
    showTimePicker: true,
    format24h: false,
    minDate: new Date(),
    icon: 'celebration',
    helperText: 'Quando será o grande dia?',
  }
};

// ========== FORMULÁRIO ==========

export const WithFormControlName: Story = {
  name: '📝 Com formControlName',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 600px; font-family: Montserrat;">
        <h3>Formulário de Reserva</h3>
        
        <form [formGroup]="form">
          <!-- Single Date -->
          <web-datepicker
            label="Data de Check-in *"
            formControlName="checkIn"
            [minDate]="minDate"
            [error]="form.get('checkIn')?.invalid && form.get('checkIn')?.touched"
            errorMessage="Selecione a data de check-in">
          </web-datepicker>
          
          <br>
          
          <!-- Range -->
          <web-datepicker
            label="Período de Férias"
            mode="range"
            formControlName="vacation"
            [showPresets]="true"
            helperText="Selecione o período completo">
          </web-datepicker>
          
          <br>
          
          <!-- With Time -->
          <web-datepicker
            label="Data e Hora da Reunião *"
            formControlName="meeting"
            [showTimePicker]="true"
            [disabledWeekdays]="[0, 6]"
            [error]="form.get('meeting')?.invalid && form.get('meeting')?.touched"
            errorMessage="Reuniões apenas em dias úteis">
          </web-datepicker>
          
          <br>
          
          <div style="display: flex; gap: 1rem;">
            <button 
              type="button"
              (click)="form.reset()"
              style="padding: 0.75rem 1.5rem; border: 1px solid #CED4DA; background: white; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer;">
              Limpar
            </button>
            <button 
              type="button"
              (click)="submitForm()"
              [disabled]="form.invalid"
              style="padding: 0.75rem 1.5rem; border: none; background: #007bff; color: white; border-radius: 0.375rem; font-family: Montserrat; font-weight: 600; cursor: pointer;"
              [style.opacity]="form.invalid ? '0.5' : '1'">
              Confirmar Reserva
            </button>
          </div>
        </form>
        
        <br>
        
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Valores:</strong>
          <pre style="margin: 0.5rem 0; font-size: 0.875rem;">{{ getFormValues() }}</pre>
        </div>
      </div>
    `,
    props: {
      minDate: new Date(),
      form: new FormGroup({
        checkIn: new FormControl(null, Validators.required),
        vacation: new FormControl(null),
        meeting: new FormControl(null, Validators.required)
      }),
      getFormValues() {
        return JSON.stringify(this['form'].value, null, 2);
      },
      submitForm() {
        if (this['form'].valid) {
          alert('Formulário enviado!');
        } else {
          Object.keys(this['form'].controls).forEach(key => {
            this['form'].get(key)?.markAsTouched();
          });
        }
      }
    }
  })
};

// ========== COMPARAÇÃO ==========

export const Comparison: Story = {
  name: '🎯 Comparação de Modos',
  render: () => ({
    template: `
      <div style="font-family: Montserrat, sans-serif; padding: 2rem;">
        <h2>Modos do Datepicker</h2>
        <p style="color: #6c757d; margin-bottom: 3rem;">
          6 modos diferentes para atender qualquer necessidade
        </p>
        
        <div style="display: grid; gap: 2rem;">
          
          <!-- Single -->
          <div>
            <h3 style="margin-bottom: 0.5rem;">📅 Single (Uma Data)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Selecione uma única data - ideal para aniversários, eventos, etc
            </p>
            <web-datepicker
              label="Data Única"
              mode="single">
            </web-datepicker>
          </div>
          
          <!-- Range -->
          <div>
            <h3 style="margin-bottom: 0.5rem;">📊 Range (Período)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Selecione um período (início e fim) - perfeito para reservas
            </p>
            <web-datepicker
              label="Período"
              mode="range"
              [showPresets]="true">
            </web-datepicker>
          </div>
          
          <!-- Multiple -->
          <div>
            <h3 style="margin-bottom: 0.5rem;">🗓️ Multiple (Múltiplas)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Selecione várias datas - ideal para agendamentos múltiplos
            </p>
            <web-datepicker
              label="Múltiplas Datas"
              mode="multiple">
            </web-datepicker>
          </div>
          
        </div>
        
        <div style="margin-top: 3rem; padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
          <h4 style="margin-top: 0;">🚀 Funcionalidades Únicas</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            <li><strong>Presets Rápidos:</strong> Hoje, Ontem, Últimos 7/30 dias</li>
            <li><strong>Time Picker:</strong> Seleção de hora integrada</li>
            <li><strong>Validação Avançada:</strong> Min/max, weekdays, custom</li>
            <li><strong>Keyboard Navigation:</strong> Navegue com o teclado</li>
            <li><strong>Mobile-First:</strong> Bottom sheet em dispositivos móveis</li>
            <li><strong>Zero Dependencies:</strong> Bundle pequeno e rápido</li>
          </ul>
        </div>
      </div>
    `,
    props: {}
  })
};