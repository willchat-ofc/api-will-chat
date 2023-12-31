import type { Controller } from "../../presentation/protocols/controller";
import type { Request, Response } from "express";
import type { HttpRequest } from "../../presentation/protocols/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: {
        ...req.body,
        accountId: req.accountId,
      },
      header: req.headers,
      params: req.params,
    };

    const httpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
