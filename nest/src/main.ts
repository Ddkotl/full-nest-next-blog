import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   session({
  //     secret: 'keyword',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('TechBlog')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('Ddkotl')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on port  - ${PORT}`);
  });
}
bootstrap();
