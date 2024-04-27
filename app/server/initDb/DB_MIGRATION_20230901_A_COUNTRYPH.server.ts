import _ from "lodash";

import { prisma } from "~/db.server";

import philippineData from "../../lib/data/philippinedata.json";
function capitalize(str) {
  return _.startCase(_.toLower(str));
}
export default function () {
  return {
    name: "DB_MIGRATION_20230901_A_COUNTRYPH.server_5",
    execute: async () => {
      const countryData = await prisma.country.create({
        data: {
          name: "Philippines",
        },
      });

      const regions = Object.values(philippineData);
      for (const regionEntry of regions) {
        const originalRegionName = regionEntry.region_name;
        const regionName = capitalize(originalRegionName);
        const regionData = await prisma.region.create({
          data: {
            name: regionName,
            countryId: countryData.id,
          },
        });

        const provinceList = Object.keys(regionEntry.province_list);
        for (const provinceEntry of provinceList) {
          const provinceOriginalName = provinceEntry;
          const provinceName = capitalize(provinceOriginalName);
          const provinceData = await prisma.province.create({
            data: {
              name: provinceName,
              regionId: regionData.id,
              countryId: countryData.id,
            },
          });

          const provinceJson =
            regionEntry.province_list[provinceOriginalName].municipality_list;
          const cities = Object.keys(provinceJson);
          for (const cityEntry of cities) {
            const cityOriginalName = cityEntry;
            const cityName = capitalize(cityOriginalName);

            const cityData = await prisma.city.create({
              data: {
                name: cityName,
                provinceId: provinceData.id,
                regionId: regionData.id,
                countryId: countryData.id,
              },
            });
          }
        }
      }
    },
  };
}
