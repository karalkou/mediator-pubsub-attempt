import Config, { environment } from 'webpack-config';

environment.setAll({
        env: () => process.env.NODE_ENV
});

export default new Config().extend('webpack-configs/webpack.[env].config.js');