import { component$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="text" placeholder="password" class="input input-bordered" />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div class="form-control mt-6">
              <a class="btn btn-primary">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Sign in ● ger2'
}
