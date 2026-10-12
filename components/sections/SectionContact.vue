<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import type { ContactBlock } from "../../lib/site-config.schema";

const props = defineProps<{ data: ContactBlock }>();

const fieldsEnabled = props.data.form.fields;
const form = reactive({
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  consent: false,
  hp_company: "",
});
const submittedAt = ref(Date.now());

const state = ref<"idle" | "submitting" | "success" | "error">("idle");
const serverErrors = ref<Record<string, string>>({});
const generalError = ref("");

const f = computed(() => fieldsEnabled);

async function onSubmit(e: Event) {
  e.preventDefault();
  if (state.value === "submitting") return;
  serverErrors.value = {};
  generalError.value = "";
  state.value = "submitting";
  try {
    const payload = {
      ...form,
      phone: f.value.phone ? form.phone : "",
      company: f.value.company ? form.company : "",
      subject: f.value.subject ? form.subject : "",
      submittedAt: submittedAt.value,
    };
    const res = await $fetch<{ ok: boolean; fieldErrors?: Record<string, string>; error?: string; dryRun?: boolean }>("/api/contact", {
      method: "POST",
      body: payload,
    });
    if (res.ok) {
      state.value = "success";
      return;
    }
    if (res.fieldErrors) {
      serverErrors.value = res.fieldErrors;
    }
    generalError.value = res.error ?? props.data.form.errorMessage;
    state.value = "error";
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : props.data.form.errorMessage;
    generalError.value = message;
    state.value = "error";
  }
}

const { site } = useSiteConfig();
</script>

<template>
  <section :id="props.data.id" class="contact" aria-labelledby="contact-headline">
    <div class="container-prose grid">
      <aside class="info" v-if="props.data.showBusinessDetails || props.data.showHours">
        <h2 class="info-title">Get in touch</h2>
        <p v-if="props.data.body" class="info-body">{{ props.data.body }}</p>
        <dl class="info-list">
          <div v-if="props.data.showBusinessDetails">
            <dt>Email</dt>
            <dd><a :href="`mailto:${site.business.email}`">{{ site.business.email }}</a></dd>
          </div>
          <div v-if="props.data.showBusinessDetails && site.business.phone">
            <dt>Phone</dt>
            <dd><a :href="`tel:${site.business.phone.replace(/[^+\d]/g, '')}`">{{ site.business.phone }}</a></dd>
          </div>
          <div v-if="props.data.showBusinessDetails">
            <dt>Address</dt>
            <dd>
              <span>{{ site.business.address.street }}</span><br />
              <span>{{ site.business.address.city }}, {{ site.business.address.region }} {{ site.business.address.postalCode }}</span><br />
              <span>{{ site.business.address.country }}</span>
            </dd>
          </div>
          <div v-if="props.data.showHours && site.business.hours.length">
            <dt>Hours</dt>
            <dd>
              <ul class="hours">
                <li v-for="h in site.business.hours" :key="h.days">
                  <span class="days">{{ h.days }}</span>
                  <span class="times">
                    <template v-if="h.opens && h.closes">{{ h.opens }}–{{ h.closes }}</template>
                    <template v-else>Closed</template>
                    <em v-if="h.note"> {{ h.note }}</em>
                  </span>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </aside>

      <form class="form" novalidate @submit="onSubmit" aria-describedby="contact-form-status">
        <h2 id="contact-headline" class="form-title">{{ props.data.headline }}</h2>
        <p v-if="!props.data.showBusinessDetails && props.data.body" class="form-body">{{ props.data.body }}</p>

        <div v-if="state === 'success'" class="status status-success" role="status" aria-live="polite">
          <p>{{ props.data.form.successMessage }}</p>
        </div>
        <div v-else id="contact-form-status" class="status" :class="{ 'status-error': state === 'error' }" role="status" aria-live="polite">
          <p v-if="state === 'error'">{{ generalError || props.data.form.errorMessage }}</p>
        </div>

        <div v-if="state !== 'success'" class="fields">
          <div v-if="f.name" class="field">
            <label for="cf-name" class="field-label">Name <span aria-hidden="true">*</span></label>
            <input id="cf-name" v-model="form.name" name="name" required maxlength="120" autocomplete="name" class="input" :aria-invalid="!!serverErrors.name" />
            <span v-if="serverErrors.name" class="field-error">{{ serverErrors.name }}</span>
          </div>
          <div v-if="f.email" class="field">
            <label for="cf-email" class="field-label">Email <span aria-hidden="true">*</span></label>
            <input id="cf-email" v-model="form.email" name="email" type="email" required maxlength="254" autocomplete="email" class="input" :aria-invalid="!!serverErrors.email" />
            <span v-if="serverErrors.email" class="field-error">{{ serverErrors.email }}</span>
          </div>
          <div v-if="f.phone" class="field">
            <label for="cf-phone" class="field-label">Phone</label>
            <input id="cf-phone" v-model="form.phone" name="phone" type="tel" maxlength="40" autocomplete="tel" class="input" />
          </div>
          <div v-if="f.company" class="field">
            <label for="cf-company" class="field-label">Company</label>
            <input id="cf-company" v-model="form.company" name="company" maxlength="120" autocomplete="organization" class="input" />
          </div>
          <div v-if="f.subject" class="field">
            <label for="cf-subject" class="field-label">Subject</label>
            <input id="cf-subject" v-model="form.subject" name="subject" maxlength="200" class="input" />
          </div>
          <div v-if="f.message" class="field">
            <label for="cf-message" class="field-label">Message <span aria-hidden="true">*</span></label>
            <textarea id="cf-message" v-model="form.message" name="message" required minlength="10" maxlength="5000" rows="6" class="textarea" :aria-invalid="!!serverErrors.message" />
            <span v-if="serverErrors.message" class="field-error">{{ serverErrors.message }}</span>
          </div>
          <div class="hp-hidden" aria-hidden="true">
            <label for="cf-hp">Company (leave blank)</label>
            <input id="cf-hp" v-model="form.hp_company" name="hp_company" tabindex="-1" autocomplete="off" />
          </div>
          <div class="field consent">
            <label>
              <input type="checkbox" v-model="form.consent" required />
              <span>{{ props.data.form.consentLabel }}</span>
            </label>
            <span v-if="serverErrors.consent" class="field-error">{{ serverErrors.consent }}</span>
          </div>
          <button type="submit" class="btn btn-primary submit" :disabled="state === 'submitting'">
            {{ state === "submitting" ? "Sending…" : props.data.form.submitLabel }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact { padding-block: 4rem; }
.grid {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: start;
}
@media (min-width: 900px) {
  .grid { grid-template-columns: 0.8fr 1.2fr; }
}
.info {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
}
.info-title { margin: 0 0 0.5rem; font-size: 1.25rem; }
.info-body { color: var(--color-muted); margin: 0 0 1.25rem; }
.info-list { display: grid; gap: 1rem; margin: 0; }
.info-list dt { font-weight: 600; font-size: 0.9rem; }
.info-list dd { margin: 0.25rem 0 0; color: var(--color-muted); }
.info-list a { color: var(--color-text); }
.hours { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.25rem; }
.hours li { display: flex; justify-content: space-between; gap: 1rem; }
.days { color: var(--color-text); font-weight: 500; }
.times { color: var(--color-muted); }
.times em { font-style: normal; opacity: 0.8; }
.form-title { margin: 0 0 0.5rem; font-size: 1.5rem; }
.form-body { color: var(--color-muted); margin: 0 0 1.25rem; }
.status { min-height: 1.5rem; margin: 0 0 1rem; }
.status-success p {
  background: color-mix(in oklch, var(--color-primary) 12%, transparent);
  color: var(--color-text);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid color-mix(in oklch, var(--color-primary) 30%, transparent);
  margin: 0;
}
.status-error p {
  background: oklch(96% 0.04 25);
  color: oklch(35% 0.18 25);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid oklch(85% 0.08 25);
  margin: 0;
}
.fields { display: grid; gap: 1rem; }
.consent label { display: inline-flex; gap: 0.5rem; align-items: flex-start; cursor: pointer; }
.consent input { margin-top: 0.25rem; }
.submit { width: 100%; padding: 0.75rem 1rem; }
@media (min-width: 600px) {
  .submit { width: auto; min-width: 12rem; }
}
</style>
